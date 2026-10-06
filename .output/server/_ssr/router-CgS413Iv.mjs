import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { a as QueryClientProvider, c as require_react, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { T as useRouter, Y as redirect, _ as Outlet, b as createRootRouteWithContext, f as Scripts, g as createRouter, p as HeadContent, v as lazyRouteComponent, x as Link, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$18 } from "./comunidade._slug-DgMLG7-D.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route$19 } from "./pet._petId-GXe_jxJ2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CgS413Iv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DyWKbgxV.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center nuppy-bg px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-display text-brand",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-display text-foreground",
					children: "Página não encontrada"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Esse caminho ainda não tem patinhas por aqui."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-display text-primary-foreground",
						children: "Voltar ao início"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center nuppy-bg px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-display text-brand",
					children: "Algo deu errado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Tente novamente em alguns segundos."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-full bg-primary px-5 py-2 text-sm font-display text-primary-foreground",
						children: "Tentar novamente"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-full border border-border bg-card px-5 py-2 text-sm font-display",
						children: "Início"
					})]
				})
			]
		})
	});
}
var Route$17 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, maximum-scale=1"
			},
			{ title: "Nuppy — Onde todo animal encontra cuidado" },
			{
				name: "description",
				content: "Nuppy: rede social pet com feed, perfis de pets, comunidades e mapa de lugares pet friendly."
			},
			{
				name: "theme-color",
				content: "#F2A847"
			},
			{
				property: "og:title",
				content: "Nuppy — Onde todo animal encontra cuidado"
			},
			{
				property: "og:description",
				content: "Nuppy: rede social pet com feed, perfis de pets, comunidades e mapa de lugares pet friendly."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:title",
				content: "Nuppy — Onde todo animal encontra cuidado"
			},
			{
				name: "twitter:description",
				content: "Nuppy: rede social pet com feed, perfis de pets, comunidades e mapa de lugares pet friendly."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de2003fd-e73b-409f-86da-c44fe06f88fb/id-preview-ef512e49--d7b031d2-513b-4aca-9f5e-615c8082f651.lovable.app-1783855792198.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de2003fd-e73b-409f-86da-c44fe06f88fb/id-preview-ef512e49--d7b031d2-513b-4aca-9f5e-615c8082f651.lovable.app-1783855792198.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$17.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => sub.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$16 = () => import("./routes-Ccckzvmb.mjs");
var Route$16 = createFileRoute("/")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./route-Di7iQBCH.mjs");
var Route$15 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./auth-Bn537Q38.mjs");
var Route$14 = createFileRoute("/auth")({
	ssr: false,
	head: () => ({ meta: [{ title: "Entrar — Nuppy" }, {
		name: "description",
		content: "Entre ou crie sua conta no Nuppy, a rede social dos pets."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./comunidades-DVT4WzO-.mjs");
var Route$13 = createFileRoute("/_authenticated/comunidades")({
	head: () => ({ meta: [{ title: "Comunidades — Nuppy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./estabelecimentos-BR1vVBKF.mjs");
var Route$12 = createFileRoute("/_authenticated/estabelecimentos")({
	head: () => ({ meta: [{ title: "Estabelecimentos — Nuppy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./home-BRVLmugv.mjs");
var Route$11 = createFileRoute("/_authenticated/home")({
	head: () => ({ meta: [{ title: "Início — Nuppy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./local-PDvMEJHm.mjs");
var Route$10 = createFileRoute("/_authenticated/local")({
	head: () => ({ meta: [{ title: "Mapa Pet Friendly — Nuppy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./perfil-6WcfZC25.mjs");
var Route$9 = createFileRoute("/_authenticated/perfil")({
	head: () => ({ meta: [{ title: "Perfil — Nuppy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./servicos-DX-s_2W3.mjs");
var Route$8 = createFileRoute("/_authenticated/servicos")({
	head: () => ({ meta: [{ title: "Serviços Pet — Nuppy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./social-cxPOpNct.mjs");
var Route$7 = createFileRoute("/_authenticated/social")({
	head: () => ({ meta: [{ title: "Feed — Nuppy" }, {
		name: "description",
		content: "Feed social do Nuppy: fotos e vídeos da rotina pet."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
/** Placeholder cinza animado mostrado enquanto o feed busca dados. */
/**
* Toca o vídeo automaticamente APENAS quando ele está visível na tela
* (usando IntersectionObserver). Quando sai da viewport, pausa para
* economizar bateria e dados móveis. Tem botão de mute persistido.
*/
/** "há 2 min", "há 3 h", "há 5 d" — formato pt-BR relativo. */
/** Hook que detecta duplo-toque/clique e chama o callback. */
var $$splitComponentImporter$6 = () => import("./configuracoes.index-C2UpWN4o.mjs");
var Route$6 = createFileRoute("/_authenticated/configuracoes/")({
	head: () => ({ meta: [{ title: "Configurações — Nuppy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./configuracoes.contato-C-OE6mfI.mjs");
var Route$5 = createFileRoute("/_authenticated/configuracoes/contato")({
	head: () => ({ meta: [{ title: "Contato — Nuppy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./configuracoes.privacidade-BfB8pwnW.mjs");
var Route$4 = createFileRoute("/_authenticated/configuracoes/privacidade")({
	head: () => ({ meta: [{ title: "Privacidade — Nuppy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./configuracoes.privacidade-politica-BlExq4i_.mjs");
var Route$3 = createFileRoute("/_authenticated/configuracoes/privacidade-politica")({
	head: () => ({ meta: [{ title: "Política de privacidade — Nuppy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./configuracoes.termos-DA3DgCFz.mjs");
var Route$2 = createFileRoute("/_authenticated/configuracoes/termos")({
	head: () => ({ meta: [{ title: "Termos — Nuppy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitNotFoundComponentImporter = () => import("./estabelecimento._id-dctv2ae_.mjs");
var $$splitErrorComponentImporter = () => import("./estabelecimento._id-Cgva4dq7.mjs");
var $$splitComponentImporter$1 = () => import("./estabelecimento._id-BUaqx7ps.mjs");
var Route$1 = createFileRoute("/_authenticated/estabelecimento/$id")({
	head: () => ({ meta: [{ title: `Estabelecimento — Nuppy` }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var $$splitComponentImporter = () => import("./pet.novo-lhwL0Q2l.mjs");
var Route = createFileRoute("/_authenticated/pet/novo")({
	head: () => ({ meta: [{ title: "Novo Pet — Nuppy" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Definição das 4 etapas do wizard */
var IndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$17
});
var AuthenticatedRouteRoute = Route$15.update({
	id: "/_authenticated",
	getParentRoute: () => Route$17
});
var AuthRoute = Route$14.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$17
});
var AuthenticatedComunidadesRoute = Route$13.update({
	id: "/comunidades",
	path: "/comunidades",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedEstabelecimentosRoute = Route$12.update({
	id: "/estabelecimentos",
	path: "/estabelecimentos",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedHomeRoute = Route$11.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLocalRoute = Route$10.update({
	id: "/local",
	path: "/local",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPerfilRoute = Route$9.update({
	id: "/perfil",
	path: "/perfil",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedServicosRoute = Route$8.update({
	id: "/servicos",
	path: "/servicos",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSocialRoute = Route$7.update({
	id: "/social",
	path: "/social",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedComunidadeSlugRoute = Route$18.update({
	id: "/comunidade/$slug",
	path: "/comunidade/$slug",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedConfiguracoesIndexRoute = Route$6.update({
	id: "/configuracoes/",
	path: "/configuracoes/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedComunidadesRoute,
	AuthenticatedEstabelecimentosRoute,
	AuthenticatedHomeRoute,
	AuthenticatedLocalRoute,
	AuthenticatedPerfilRoute,
	AuthenticatedServicosRoute,
	AuthenticatedSocialRoute,
	AuthenticatedComunidadeSlugRoute,
	AuthenticatedConfiguracoesContatoRoute: Route$5.update({
		id: "/configuracoes/contato",
		path: "/configuracoes/contato",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedConfiguracoesPrivacidadeRoute: Route$4.update({
		id: "/configuracoes/privacidade",
		path: "/configuracoes/privacidade",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedConfiguracoesPrivacidadePoliticaRoute: Route$3.update({
		id: "/configuracoes/privacidade-politica",
		path: "/configuracoes/privacidade-politica",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedConfiguracoesTermosRoute: Route$2.update({
		id: "/configuracoes/termos",
		path: "/configuracoes/termos",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedEstabelecimentoIdRoute: Route$1.update({
		id: "/estabelecimento/$id",
		path: "/estabelecimento/$id",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedPetPetIdRoute: Route$19.update({
		id: "/pet/$petId",
		path: "/pet/$petId",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedPetNovoRoute: Route.update({
		id: "/pet/novo",
		path: "/pet/novo",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedConfiguracoesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
