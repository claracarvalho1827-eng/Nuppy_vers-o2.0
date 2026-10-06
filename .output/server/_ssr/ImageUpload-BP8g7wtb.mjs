import { n as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { R as LoaderCircle, nt as Camera } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as uploadImage } from "./upload-CsuYq30c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ImageUpload-BP8g7wtb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ImageUpload({ bucket, value, onChange, label = "Adicionar foto", shape = "square" }) {
	const ref = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function handleFile(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 8 * 1024 * 1024) {
			toast.error("Máx 8MB");
			return;
		}
		setBusy(true);
		try {
			onChange(await uploadImage(bucket, file));
			toast.success("Foto enviada!");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro no upload");
		} finally {
			setBusy(false);
			if (ref.current) ref.current.value = "";
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => ref.current?.click(),
			className: `${shape === "circle" ? "size-28 rounded-full" : shape === "wide" ? "w-full aspect-[16/9] rounded-2xl" : "size-32 rounded-2xl"} border-2 border-dashed border-border bg-muted overflow-hidden grid place-items-center relative hover:border-primary transition`,
			children: [value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: value,
				alt: "",
				className: "w-full h-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-1 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-display",
					children: label
				})]
			}), busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 grid place-items-center bg-black/40 text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref,
			type: "file",
			accept: "image/*",
			className: "hidden",
			onChange: handleFile
		})]
	});
}
//#endregion
export { ImageUpload as t };
