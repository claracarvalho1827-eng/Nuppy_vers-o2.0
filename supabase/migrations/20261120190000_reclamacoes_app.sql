-- ============================================================================
--  RECLAMAÇÕES NO APP  (tela /configuracoes/reclamacao)
-- ----------------------------------------------------------------------------
--  Idempotente: pode rodar mesmo que o admin.sql do site já tenha criado a
--  tabela `reclamacoes`. Só acrescenta o que o app precisa:
--    1. a tabela (caso ainda não exista)
--    2. colunas de referência para DENÚNCIAS (post, comentário, perfil...)
--    3. leitura das PRÓPRIAS reclamações pelo usuário (histórico no app)
--    4. limites anti-spam (5 pendentes por usuário, 10 por dia)
-- ============================================================================

-- 1) Tabela (igual à do supabase/admin.sql do site) -------------------------
create table if not exists public.reclamacoes (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete set null default auth.uid(),
  nome          text,
  email         text,
  assunto       text,
  mensagem      text not null check (char_length(mensagem) <= 3000),
  status        text not null default 'aberta' check (status in ('aberta', 'resolvida')),
  created_at    timestamptz not null default now(),
  resolvida_em  timestamptz,
  resolvida_por uuid references auth.users(id) on delete set null
);
create index if not exists reclamacoes_status_idx on public.reclamacoes (status, created_at desc);
create index if not exists reclamacoes_user_idx   on public.reclamacoes (user_id, created_at desc);

grant select, insert, update on public.reclamacoes to authenticated;
grant all on public.reclamacoes to service_role;
alter table public.reclamacoes enable row level security;

drop policy if exists "usuarios enviam reclamacao" on public.reclamacoes;
create policy "usuarios enviam reclamacao"
  on public.reclamacoes for insert to authenticated
  with check (status = 'aberta' and user_id = auth.uid());

drop policy if exists "admin le reclamacoes" on public.reclamacoes;
create policy "admin le reclamacoes"
  on public.reclamacoes for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "admin resolve reclamacoes" on public.reclamacoes;
create policy "admin resolve reclamacoes"
  on public.reclamacoes for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- 2) Referência da denúncia -------------------------------------------------
--    Quando a reclamação é uma DENÚNCIA, guarda o que está sendo denunciado.
--    Os dois campos andam juntos: ou ambos preenchidos, ou ambos vazios.
alter table public.reclamacoes
  add column if not exists referencia_tipo text,
  add column if not exists referencia_id   uuid;

alter table public.reclamacoes drop constraint if exists reclamacoes_referencia_chk;
alter table public.reclamacoes add constraint reclamacoes_referencia_chk check (
  (referencia_tipo is null and referencia_id is null)
  or (referencia_id is not null
      and referencia_tipo in ('post', 'comentario', 'perfil', 'mensagem', 'estabelecimento', 'servico'))
);

-- Limites de tamanho / conteúdo mínimo
alter table public.reclamacoes drop constraint if exists reclamacoes_campos_chk;
alter table public.reclamacoes add constraint reclamacoes_campos_chk check (
  char_length(btrim(mensagem)) >= 10
  and (assunto is null or char_length(assunto) <= 80)
  and (nome    is null or char_length(nome)    <= 160)
  and (email   is null or char_length(email)   <= 160)
);

-- 3) O usuário enxerga as PRÓPRIAS reclamações (aba "Minhas reclamações") ----
drop policy if exists "usuario le proprias reclamacoes" on public.reclamacoes;
create policy "usuario le proprias reclamacoes"
  on public.reclamacoes for select to authenticated
  using (user_id = auth.uid());

-- 4) Anti-spam --------------------------------------------------------------
--    O app mostra uma mensagem amigável quando o erro traz esses textos.
create or replace function public.limitar_reclamacoes()
returns trigger
language plpgsql security definer
set search_path = public
as $$
declare
  abertas int;
  hoje    int;
begin
  select count(*) into abertas
    from public.reclamacoes
   where user_id = new.user_id and status = 'aberta';
  if abertas >= 5 then
    raise exception 'limite_reclamacoes_abertas' using errcode = 'P0001';
  end if;

  select count(*) into hoje
    from public.reclamacoes
   where user_id = new.user_id and created_at > now() - interval '24 hours';
  if hoje >= 10 then
    raise exception 'limite_reclamacoes_diario' using errcode = 'P0001';
  end if;

  return new;
end;
$$;

revoke all on function public.limitar_reclamacoes() from public, anon, authenticated;

drop trigger if exists trg_limitar_reclamacoes on public.reclamacoes;
create trigger trg_limitar_reclamacoes
  before insert on public.reclamacoes
  for each row execute function public.limitar_reclamacoes();
