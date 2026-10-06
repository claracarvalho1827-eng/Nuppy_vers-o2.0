import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pet._petId-GXe_jxJ2.js
var $$splitComponentImporter = () => import("./pet._petId-D4GR2QP-.mjs");
var Route = createFileRoute("/_authenticated/pet/$petId")({
	head: () => ({ meta: [{ title: "Pet — Nuppy" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
