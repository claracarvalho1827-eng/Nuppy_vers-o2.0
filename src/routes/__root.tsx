import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import a11yCss from "../../a11y/a11y.css?url";
import { AccessibilityKit } from "../components/AccessibilityKit";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "../integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center nuppy-bg px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-brand">404</h1>
        <h2 className="mt-4 text-xl font-display text-foreground">
          Página não encontrada
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Esse caminho ainda não tem patinhas por aqui.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-display text-primary-foreground"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({
  error,
  reset,
}: {
  error: unknown;
  reset: () => void;
}) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    const normalizedError =
      error instanceof Error ? error : new Error(String(error));

    reportLovableError(normalizedError, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center nuppy-bg px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-display text-brand">Algo deu errado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tente novamente em alguns segundos.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-5 py-2 text-sm font-display text-primary-foreground"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="rounded-full border border-border bg-card px-5 py-2 text-sm font-display"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route =
  createRootRouteWithContext<{ queryClient: QueryClient }>()({
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          title: "Nuppy — Onde todo animal encontra cuidado",
        },
        {
          name: "description",
          content:
            "Nuppy: rede social pet com feed, perfis de pets, comunidades e mapa de lugares pet friendly.",
        },
        { name: "theme-color", content: "#F2A847" },
        {
          property: "og:title",
          content: "Nuppy — Onde todo animal encontra cuidado",
        },
        {
          property: "og:description",
          content:
            "Nuppy: rede social pet com feed, perfis de pets, comunidades e mapa de lugares pet friendly.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        {
          name: "twitter:title",
          content: "Nuppy — Onde todo animal encontra cuidado",
        },
        {
          name: "twitter:description",
          content:
            "Nuppy: rede social pet com feed, perfis de pets, comunidades e mapa de lugares pet friendly.",
        },
        {
          property: "og:image",
          content:
            "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de2003fd-e73b-409f-86da-c44fe06f88fb/id-preview-ef512e49--d7b031d2-513b-4aca-9f5e-615c8082f651.lovable.app-1783855792198.png",
        },
        {
          name: "twitter:image",
          content:
            "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de2003fd-e73b-409f-86da-c44fe06f88fb/id-preview-ef512e49--d7b031d2-513b-4aca-9f5e-615c8082f651.lovable.app-1783855792198.png",
        },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "stylesheet", href: a11yCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700&display=swap",
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  });

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (
        event !== "SIGNED_IN" &&
        event !== "SIGNED_OUT" &&
        event !== "USER_UPDATED"
      ) {
        return;
      }

      router.invalidate();

      if (event !== "SIGNED_OUT") {
        queryClient.invalidateQueries();
      }
    });

    return () => sub.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <AccessibilityKit />
    </QueryClientProvider>
  );
}
