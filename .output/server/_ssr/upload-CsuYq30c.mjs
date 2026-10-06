import { t as supabase } from "./client-CrwDbVDs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload-CsuYq30c.js
/**
* Uploads a file (image or video) to a private bucket under a user-scoped folder
* and returns a long-lived signed URL safe to store in the database.
*/
async function uploadImage(bucket, file) {
	const { data: { user } } = await supabase.auth.getUser();
	if (!user) throw new Error("Faça login para enviar arquivos");
	const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
	const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
	const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
		cacheControl: "3600",
		upsert: false,
		contentType: file.type || void 0
	});
	if (upErr) throw upErr;
	const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 3600 * 24 * 365 * 10);
	if (error || !data) throw error ?? /* @__PURE__ */ new Error("Falha ao gerar URL");
	return data.signedUrl;
}
var uploadMedia = uploadImage;
//#endregion
export { uploadMedia as n, uploadImage as t };
