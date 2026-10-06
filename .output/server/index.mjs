globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/ImageUpload-By4uWFFl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"603-7h1R8pKl0okd6VPyKuTWv168OaM\"",
		"mtime": "2026-10-06T19:27:44.649Z",
		"size": 1539,
		"path": "../public/assets/ImageUpload-By4uWFFl.js"
	},
	"/assets/MobileShell-BP_gr8mt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"998-wak5XImHU35OQHQy/kZgUIO6bOA\"",
		"mtime": "2026-10-06T19:27:44.649Z",
		"size": 2456,
		"path": "../public/assets/MobileShell-BP_gr8mt.js"
	},
	"/assets/auth-Ck2OH_7G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d5-WIFwjApR60GHeITaeIng0JNn//Y\"",
		"mtime": "2026-10-06T19:27:44.649Z",
		"size": 8405,
		"path": "../public/assets/auth-Ck2OH_7G.js"
	},
	"/assets/camera-oCUuiOsu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"144-8pztInZ0gNhtLFi4j5PhOH2nOZE\"",
		"mtime": "2026-10-06T19:27:44.649Z",
		"size": 324,
		"path": "../public/assets/camera-oCUuiOsu.js"
	},
	"/assets/chevron-left-BAVeUUid.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-NT3k8IxkoeZrwRqm0aZ+/duo3GA\"",
		"mtime": "2026-10-06T19:27:44.649Z",
		"size": 118,
		"path": "../public/assets/chevron-left-BAVeUUid.js"
	},
	"/assets/comunidade._slug-Bzb-EyII.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fc-qpoGwBGFuNzdpqRd7XxoT7HPNtM\"",
		"mtime": "2026-10-06T19:27:44.649Z",
		"size": 508,
		"path": "../public/assets/comunidade._slug-Bzb-EyII.js"
	},
	"/assets/chevron-right-DJ1ncv55.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-2NdYQKm59jpkkvBmrb2y4xIeVGw\"",
		"mtime": "2026-10-06T19:27:44.649Z",
		"size": 118,
		"path": "../public/assets/chevron-right-DJ1ncv55.js"
	},
	"/assets/comunidade._slug-j57_SvDO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"231b-953N3u9AyfEoHcdCf7mI/rueC3M\"",
		"mtime": "2026-10-06T19:27:44.649Z",
		"size": 8987,
		"path": "../public/assets/comunidade._slug-j57_SvDO.js"
	},
	"/assets/comunidade._slug-ChIB4YOZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c3-ANcuaB2uHfYLYdYt4v0qwtVck+s\"",
		"mtime": "2026-10-06T19:27:44.649Z",
		"size": 963,
		"path": "../public/assets/comunidade._slug-ChIB4YOZ.js"
	},
	"/assets/comunidades-Dp2-gEs4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1605-B98cA7HdIe35WqRPXbFKMD+JlHs\"",
		"mtime": "2026-10-06T19:27:44.649Z",
		"size": 5637,
		"path": "../public/assets/comunidades-Dp2-gEs4.js"
	},
	"/assets/configuracoes.contato-BglX9yP2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5dd-1htL3uoMWB/aGeY9HYJKyMwDjeI\"",
		"mtime": "2026-10-06T19:27:44.649Z",
		"size": 1501,
		"path": "../public/assets/configuracoes.contato-BglX9yP2.js"
	},
	"/assets/configuracoes.index-DBHz_ZNY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1312-hiFQACNSb8IjRnDdRgtZpcYit5U\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 4882,
		"path": "../public/assets/configuracoes.index-DBHz_ZNY.js"
	},
	"/assets/configuracoes.privacidade-CEsC5EkH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4fc-y3c6F0zg/BD4uMxWjVe+8eE4CEI\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 1276,
		"path": "../public/assets/configuracoes.privacidade-CEsC5EkH.js"
	},
	"/assets/configuracoes.privacidade-politica-Bh66YZPl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"605-n84WRyF9Uafbmhql9cuYriBlpCg\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 1541,
		"path": "../public/assets/configuracoes.privacidade-politica-Bh66YZPl.js"
	},
	"/assets/configuracoes.termos-D2iHDYxW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d9-Mm828l7rFTnDSSu6HRrd+7r3Yq8\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 1497,
		"path": "../public/assets/configuracoes.termos-D2iHDYxW.js"
	},
	"/assets/dist-DiLiRt0F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"49f6-Uwl8SET8Gk1WD5ftxcLyov7PI7M\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 18934,
		"path": "../public/assets/dist-DiLiRt0F.js"
	},
	"/assets/estabelecimento._id-BAPGbGqD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"310b-+E7TV4lT2r8xgf2VMr1s3433BOk\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 12555,
		"path": "../public/assets/estabelecimento._id-BAPGbGqD.js"
	},
	"/assets/estabelecimento._id-CzSuw3Eg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d7-WuSQ0EUdfltic8KuvsLvs6zTJ2o\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 471,
		"path": "../public/assets/estabelecimento._id-CzSuw3Eg.js"
	},
	"/assets/estabelecimentos-B6Utg9PK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"155e-gDuwBUev/iyvTUALQ5bnv6WS9GQ\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 5470,
		"path": "../public/assets/estabelecimentos-B6Utg9PK.js"
	},
	"/assets/home-Dxm557yr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a3f-dAtX5PAUL+Tkmzj9ysn0M9q7jrw\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 2623,
		"path": "../public/assets/home-Dxm557yr.js"
	},
	"/assets/instagram-JzZQdVYE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11c-e4w/Pss78QagGet+hRHTwoVKD/s\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 284,
		"path": "../public/assets/instagram-JzZQdVYE.js"
	},
	"/assets/link-gyWqUBjk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25c3-7/xRR/SuV1Ltzi5y6n/sU0TIaL8\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 9667,
		"path": "../public/assets/link-gyWqUBjk.js"
	},
	"/assets/local-BnMgYf8t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2944-Y1rnSEelsALRTK4gBZDTWZm+Uvo\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 10564,
		"path": "../public/assets/local-BnMgYf8t.js"
	},
	"/assets/estabelecimento._id-DNVNGL47.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"216-DSkDdUcpX7QAwXfaid9RXz2aS/I\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 534,
		"path": "../public/assets/estabelecimento._id-DNVNGL47.js"
	},
	"/assets/index-DFAGlHOZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"81ce9-XH7J8MGCotD7rfhSBhKVShOTdmU\"",
		"mtime": "2026-10-06T19:27:44.648Z",
		"size": 531689,
		"path": "../public/assets/index-DFAGlHOZ.js"
	},
	"/assets/lock-DAUHU5CQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c2-9mlF3LvSq16ol5xrqIH5mefx+1I\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 194,
		"path": "../public/assets/lock-DAUHU5CQ.js"
	},
	"/assets/mail-D0b7a9l8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c9-Pu3lb0+1mc2+jo9T5qrqNBGWpxs\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 201,
		"path": "../public/assets/mail-D0b7a9l8.js"
	},
	"/assets/map-Dd53SYJZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d-ztlPEDVvdb7PsQOsMRdBcrehXw0\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 413,
		"path": "../public/assets/map-Dd53SYJZ.js"
	},
	"/assets/mic-CxxZi1lA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df-At3VhMoRQEs0bJStFpT9wdaHUE8\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 223,
		"path": "../public/assets/mic-CxxZi1lA.js"
	},
	"/assets/passaro-CHphC7wt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34-mHUjL4/3L4jCX9U4CpPFf8i/W3w\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 52,
		"path": "../public/assets/passaro-CHphC7wt.js"
	},
	"/assets/passaro-Cw80xXel.png": {
		"type": "image/png",
		"etag": "\"2e951-YVsgVqCIC2N/pVlyQ4eLi3cLAAo\"",
		"mtime": "2026-10-06T19:27:44.654Z",
		"size": 190801,
		"path": "../public/assets/passaro-Cw80xXel.png"
	},
	"/assets/peludinho-DgznguLx.png": {
		"type": "image/png",
		"etag": "\"1d123-V3dy1UAgHDmKEKg8jxAV8wAsk/g\"",
		"mtime": "2026-10-06T19:27:44.654Z",
		"size": 119075,
		"path": "../public/assets/peludinho-DgznguLx.png"
	},
	"/assets/perfil-BFU4I5qu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24e5-Xb8z0Wcy4aTHN0fbeB0n0dZM8sk\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 9445,
		"path": "../public/assets/perfil-BFU4I5qu.js"
	},
	"/assets/pet._petId-r2X8J0LM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e44-Kz9gyMJDKctp/dwFG/CPoHTd/OE\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 11844,
		"path": "../public/assets/pet._petId-r2X8J0LM.js"
	},
	"/assets/pet.novo-BF3n9LUL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a83-nHI6Kt8F0FjPSfvUUrG0YN1w600\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 10883,
		"path": "../public/assets/pet.novo-BF3n9LUL.js"
	},
	"/assets/phone-LR7jpdqb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-2sTpxa3r+FMguubXoqi7YUy8aBY\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 310,
		"path": "../public/assets/phone-LR7jpdqb.js"
	},
	"/assets/plus-DLKonWj5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"149-AvKgb6xiygKMZBdIb052TgA5DGQ\"",
		"mtime": "2026-10-06T19:27:44.650Z",
		"size": 329,
		"path": "../public/assets/plus-DLKonWj5.js"
	},
	"/assets/root-CDpNo7ef.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93-DAIYjs/n7phUvy8BJw/G7UeEE1c\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 147,
		"path": "../public/assets/root-CDpNo7ef.js"
	},
	"/assets/route-DkoZfStd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-Gj0pGJQW7zbyQR2tnK9yAp9xSg8\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 139,
		"path": "../public/assets/route-DkoZfStd.js"
	},
	"/assets/routes-CY04DWkE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fc-hPV8Ejh0A0RzeKmrbbiOvwFHFmg\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 508,
		"path": "../public/assets/routes-CY04DWkE.js"
	},
	"/assets/search-wXUfl3Pb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2-+h6zvqS7p2+7JUFUu8VCMO79LVw\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 162,
		"path": "../public/assets/search-wXUfl3Pb.js"
	},
	"/assets/servicos-BPAKCtPL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"199d-zKkaTc6j8fDrXgtamIOTW85y6OA\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 6557,
		"path": "../public/assets/servicos-BPAKCtPL.js"
	},
	"/assets/social-CO9d9_b9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"533b-Z20xTImXhWBeKI2uDRFqDBiKxjg\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 21307,
		"path": "../public/assets/social-CO9d9_b9.js"
	},
	"/assets/sparkles-C3tWqZIi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-u/thwCoub17yU4wnfGT+Vx665+s\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 482,
		"path": "../public/assets/sparkles-C3tWqZIi.js"
	},
	"/assets/star-D-jMriRB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cc-xipQKD0Bh8OjKDduvr/PG9howkQ\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 460,
		"path": "../public/assets/star-D-jMriRB.js"
	},
	"/assets/stethoscope-F8rh633Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14a-OHeEigYUaB1zDF7X/Pm6XBePm+A\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 330,
		"path": "../public/assets/stethoscope-F8rh633Z.js"
	},
	"/assets/styles-DblTnS1v.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"19da3-VbVDsea2gZIjzpqnmWdJi7gJLEQ\"",
		"mtime": "2026-10-06T19:27:44.654Z",
		"size": 105891,
		"path": "../public/assets/styles-DblTnS1v.css"
	},
	"/assets/trash-2-DkN-JJS9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26c-iSdz/nYtSh618c1Y2vZ3daflnn0\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 620,
		"path": "../public/assets/trash-2-DkN-JJS9.js"
	},
	"/assets/triangle-alert-Ca3lsCHo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-g7PN1wDwfvcwHTVCBVaBq5Fsrxs\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 253,
		"path": "../public/assets/triangle-alert-Ca3lsCHo.js"
	},
	"/assets/upload-DvVyeZkW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2be-h+rVVywnPlIzVcSYgqGSACVgF3A\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 702,
		"path": "../public/assets/upload-DvVyeZkW.js"
	},
	"/assets/useBaseQuery-cVUttB9E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2254-RdY3DjQvLkUZwUOcfzB98Pui0gU\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 8788,
		"path": "../public/assets/useBaseQuery-cVUttB9E.js"
	},
	"/assets/useRouter-Cox3-v4z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"212e-A3nkKsEZa+WTLrFde+IVcdUlJj8\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 8494,
		"path": "../public/assets/useRouter-Cox3-v4z.js"
	},
	"/assets/useSelector-C42uiuO-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"874-tR327t0JjOIuBf0l1YHJZGjhCaI\"",
		"mtime": "2026-10-06T19:27:44.651Z",
		"size": 2164,
		"path": "../public/assets/useSelector-C42uiuO-.js"
	},
	"/assets/useSuspenseQuery-DotFbrvE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-bErfscL6GBMnIIKGQ3bLD2BF1vA\"",
		"mtime": "2026-10-06T19:27:44.652Z",
		"size": 174,
		"path": "../public/assets/useSuspenseQuery-DotFbrvE.js"
	},
	"/assets/nuppy-logo-HPQ2dgMx.png": {
		"type": "image/png",
		"etag": "\"23a612-QdzyhCLE1EqoAi68hU37fykUhEk\"",
		"mtime": "2026-10-06T19:27:44.652Z",
		"size": 2336274,
		"path": "../public/assets/nuppy-logo-HPQ2dgMx.png"
	},
	"/assets/user-0MWSeJgV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5fc-XpY1zIYW3mgNYSlg913vmUbtbMk\"",
		"mtime": "2026-10-06T19:27:44.652Z",
		"size": 1532,
		"path": "../public/assets/user-0MWSeJgV.js"
	},
	"/assets/video-BpF412qZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d9-lBVJ9JS3LYkVECo/uLChCmWg2PQ\"",
		"mtime": "2026-10-06T19:27:44.652Z",
		"size": 473,
		"path": "../public/assets/video-BpF412qZ.js"
	},
	"/assets/x-02ASq3Zl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-66TQZYGsx4MHzGKEfaLbbWss4QQ\"",
		"mtime": "2026-10-06T19:27:44.652Z",
		"size": 142,
		"path": "../public/assets/x-02ASq3Zl.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_yonDhW = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_yonDhW
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
