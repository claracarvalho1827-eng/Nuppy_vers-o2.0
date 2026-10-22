import { v as lazyRouteComponent, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/comunidade._slug-C1yet0Ks.js
var $$splitNotFoundComponentImporter = () => import("./comunidade._slug-DJQ_JEjC.mjs");
var $$splitErrorComponentImporter = () => import("./comunidade._slug-qybVDa5g.mjs");
var $$splitComponentImporter = () => import("./comunidade._slug-DukzNm_l.mjs");
var Route = createFileRoute("/_authenticated/comunidade/$slug")({
	head: ({ params }) => ({ meta: [{ title: `${params.slug} — Nuppy` }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
