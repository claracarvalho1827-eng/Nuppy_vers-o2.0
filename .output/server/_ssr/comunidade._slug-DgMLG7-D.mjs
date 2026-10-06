import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/comunidade._slug-DgMLG7-D.js
var $$splitNotFoundComponentImporter = () => import("./comunidade._slug-DWLl6SqL.mjs");
var $$splitErrorComponentImporter = () => import("./comunidade._slug-CxQQufk9.mjs");
var $$splitComponentImporter = () => import("./comunidade._slug-B55AS7Sf.mjs");
var Route = createFileRoute("/_authenticated/comunidade/$slug")({
	head: ({ params }) => ({ meta: [{ title: `${params.slug} — Nuppy` }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
