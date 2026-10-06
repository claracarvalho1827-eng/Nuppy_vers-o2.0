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
	"/assets/ImageUpload-0PDGVp6r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"603-eI3tY1EdKnNmG+3CXbQTghabeQc\"",
		"mtime": "2026-10-06T18:51:23.344Z",
		"size": 1539,
		"path": "../public/assets/ImageUpload-0PDGVp6r.js"
	},
	"/assets/MobileShell-BP_gr8mt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"998-wak5XImHU35OQHQy/kZgUIO6bOA\"",
		"mtime": "2026-10-06T18:51:23.344Z",
		"size": 2456,
		"path": "../public/assets/MobileShell-BP_gr8mt.js"
	},
	"/assets/auth-BXVnyboO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d5-O+qUG2/M88JdCBZoTMwgR4xK4ZQ\"",
		"mtime": "2026-10-06T18:51:23.344Z",
		"size": 8405,
		"path": "../public/assets/auth-BXVnyboO.js"
	},
	"/assets/camera-oCUuiOsu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"144-8pztInZ0gNhtLFi4j5PhOH2nOZE\"",
		"mtime": "2026-10-06T18:51:23.344Z",
		"size": 324,
		"path": "../public/assets/camera-oCUuiOsu.js"
	},
	"/assets/chevron-left-BAVeUUid.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-NT3k8IxkoeZrwRqm0aZ+/duo3GA\"",
		"mtime": "2026-10-06T18:51:23.344Z",
		"size": 118,
		"path": "../public/assets/chevron-left-BAVeUUid.js"
	},
	"/assets/chevron-right-DJ1ncv55.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-2NdYQKm59jpkkvBmrb2y4xIeVGw\"",
		"mtime": "2026-10-06T18:51:23.344Z",
		"size": 118,
		"path": "../public/assets/chevron-right-DJ1ncv55.js"
	},
	"/assets/comunidade._slug-Bzb-EyII.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fc-qpoGwBGFuNzdpqRd7XxoT7HPNtM\"",
		"mtime": "2026-10-06T18:51:23.344Z",
		"size": 508,
		"path": "../public/assets/comunidade._slug-Bzb-EyII.js"
	},
	"/assets/comunidade._slug-CQAXiMwu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"231b-U+CumhvfopNZ0oa7Ruv3RnrQMUE\"",
		"mtime": "2026-10-06T18:51:23.344Z",
		"size": 8987,
		"path": "../public/assets/comunidade._slug-CQAXiMwu.js"
	},
	"/assets/comunidade._slug-ChIB4YOZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c3-ANcuaB2uHfYLYdYt4v0qwtVck+s\"",
		"mtime": "2026-10-06T18:51:23.344Z",
		"size": 963,
		"path": "../public/assets/comunidade._slug-ChIB4YOZ.js"
	},
	"/assets/configuracoes.contato-BglX9yP2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5dd-1htL3uoMWB/aGeY9HYJKyMwDjeI\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 1501,
		"path": "../public/assets/configuracoes.contato-BglX9yP2.js"
	},
	"/assets/configuracoes.index-CfMSPD1-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1312-9lHJW73Os9mK/d1ZfmIjccAysts\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 4882,
		"path": "../public/assets/configuracoes.index-CfMSPD1-.js"
	},
	"/assets/configuracoes.privacidade-CEsC5EkH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4fc-y3c6F0zg/BD4uMxWjVe+8eE4CEI\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 1276,
		"path": "../public/assets/configuracoes.privacidade-CEsC5EkH.js"
	},
	"/assets/configuracoes.privacidade-politica-Bh66YZPl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"605-n84WRyF9Uafbmhql9cuYriBlpCg\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 1541,
		"path": "../public/assets/configuracoes.privacidade-politica-Bh66YZPl.js"
	},
	"/assets/configuracoes.termos-D2iHDYxW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d9-Mm828l7rFTnDSSu6HRrd+7r3Yq8\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 1497,
		"path": "../public/assets/configuracoes.termos-D2iHDYxW.js"
	},
	"/assets/dist-CCZG40yS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"49f6-4s/HZ+4CeFXXDWEmpUp/C1JUvHM\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 18934,
		"path": "../public/assets/dist-CCZG40yS.js"
	},
	"/assets/estabelecimento._id-CzSuw3Eg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d7-WuSQ0EUdfltic8KuvsLvs6zTJ2o\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 471,
		"path": "../public/assets/estabelecimento._id-CzSuw3Eg.js"
	},
	"/assets/estabelecimento._id-DNVNGL47.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"216-DSkDdUcpX7QAwXfaid9RXz2aS/I\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 534,
		"path": "../public/assets/estabelecimento._id-DNVNGL47.js"
	},
	"/assets/estabelecimento._id-oWzzLlfl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"310b-Lfmd0jkyyXtz4S0lluZkYk4oHkA\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 12555,
		"path": "../public/assets/estabelecimento._id-oWzzLlfl.js"
	},
	"/assets/estabelecimentos-DS4i1nff.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"155e-v+NRdTl+Pl7JcVWX5DU7vZOIRSo\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 5470,
		"path": "../public/assets/estabelecimentos-DS4i1nff.js"
	},
	"/assets/home-Dxm557yr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a3f-dAtX5PAUL+Tkmzj9ysn0M9q7jrw\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 2623,
		"path": "../public/assets/home-Dxm557yr.js"
	},
	"/assets/instagram-JzZQdVYE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11c-e4w/Pss78QagGet+hRHTwoVKD/s\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 284,
		"path": "../public/assets/instagram-JzZQdVYE.js"
	},
	"/assets/comunidades-CaOYxM0c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"162f-d8sVtcWUk8nKl/AQ6zpHY2clmT4\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 5679,
		"path": "../public/assets/comunidades-CaOYxM0c.js"
	},
	"/assets/link-gyWqUBjk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25c3-7/xRR/SuV1Ltzi5y6n/sU0TIaL8\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 9667,
		"path": "../public/assets/link-gyWqUBjk.js"
	},
	"/assets/local-0MPqp4ly.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2944-OkKGtrAOC5p0jdD9Ma2O9NImAuo\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 10564,
		"path": "../public/assets/local-0MPqp4ly.js"
	},
	"/assets/index-BcXD7wD4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"81cf6-RPUruQMBYPKPPth2fwCj5fe38So\"",
		"mtime": "2026-10-06T18:51:23.344Z",
		"size": 531702,
		"path": "../public/assets/index-BcXD7wD4.js"
	},
	"/assets/lock-DAUHU5CQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c2-9mlF3LvSq16ol5xrqIH5mefx+1I\"",
		"mtime": "2026-10-06T18:51:23.345Z",
		"size": 194,
		"path": "../public/assets/lock-DAUHU5CQ.js"
	},
	"/assets/mail-D0b7a9l8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c9-Pu3lb0+1mc2+jo9T5qrqNBGWpxs\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 201,
		"path": "../public/assets/mail-D0b7a9l8.js"
	},
	"/assets/map-Dd53SYJZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d-ztlPEDVvdb7PsQOsMRdBcrehXw0\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 413,
		"path": "../public/assets/map-Dd53SYJZ.js"
	},
	"/assets/message-circle-Be6ySoEU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e5-nAgCS3P2c0eZJlZA91uZR7InOMw\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 229,
		"path": "../public/assets/message-circle-Be6ySoEU.js"
	},
	"/assets/mic-CxxZi1lA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df-At3VhMoRQEs0bJStFpT9wdaHUE8\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 223,
		"path": "../public/assets/mic-CxxZi1lA.js"
	},
	"/assets/passaro-Cw80xXel.png": {
		"type": "image/png",
		"etag": "\"2e951-YVsgVqCIC2N/pVlyQ4eLi3cLAAo\"",
		"mtime": "2026-10-06T18:51:23.349Z",
		"size": 190801,
		"path": "../public/assets/passaro-Cw80xXel.png"
	},
	"/assets/perfil-toQqzSnS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ac3-Ti243yzLslk5a9akBOdShG2zlVw\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 10947,
		"path": "../public/assets/perfil-toQqzSnS.js"
	},
	"/assets/pet._petId-ly4VeNxT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e44-8wslvUqTWZ1j4Ptdb2Y6vwRYT1c\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 11844,
		"path": "../public/assets/pet._petId-ly4VeNxT.js"
	},
	"/assets/pet.novo-8zNGRn5C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a83-LfjSnef3EJ1q9k0TIPMVIIFigzA\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 10883,
		"path": "../public/assets/pet.novo-8zNGRn5C.js"
	},
	"/assets/phone-LR7jpdqb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-2sTpxa3r+FMguubXoqi7YUy8aBY\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 310,
		"path": "../public/assets/phone-LR7jpdqb.js"
	},
	"/assets/plus-BGJjBWga.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-7Mt3a96h8DEDYPqgIxj0VyZETsc\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 141,
		"path": "../public/assets/plus-BGJjBWga.js"
	},
	"/assets/root-CDpNo7ef.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93-DAIYjs/n7phUvy8BJw/G7UeEE1c\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 147,
		"path": "../public/assets/root-CDpNo7ef.js"
	},
	"/assets/route-iMUk7D4s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-9ZNvmAjJ25KA8iBzDXuJx8OOIDU\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 139,
		"path": "../public/assets/route-iMUk7D4s.js"
	},
	"/assets/routes-DyP0tLWm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fc-iyTRS1LARTIIQ6GSHG3CXGyjUqk\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 508,
		"path": "../public/assets/routes-DyP0tLWm.js"
	},
	"/assets/search-wXUfl3Pb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2-+h6zvqS7p2+7JUFUu8VCMO79LVw\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 162,
		"path": "../public/assets/search-wXUfl3Pb.js"
	},
	"/assets/servicos-DXIHyrsw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19c7-d1y8bB1l+K/0Jy/kxxt+qggOMms\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 6599,
		"path": "../public/assets/servicos-DXIHyrsw.js"
	},
	"/assets/social-BqD0KsNW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"535c-PrXLjULBPPtIpfuSQnp5LOvAMLk\"",
		"mtime": "2026-10-06T18:51:23.346Z",
		"size": 21340,
		"path": "../public/assets/social-BqD0KsNW.js"
	},
	"/assets/sparkles-C3tWqZIi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-u/thwCoub17yU4wnfGT+Vx665+s\"",
		"mtime": "2026-10-06T18:51:23.347Z",
		"size": 482,
		"path": "../public/assets/sparkles-C3tWqZIi.js"
	},
	"/assets/star-D-jMriRB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cc-xipQKD0Bh8OjKDduvr/PG9howkQ\"",
		"mtime": "2026-10-06T18:51:23.347Z",
		"size": 460,
		"path": "../public/assets/star-D-jMriRB.js"
	},
	"/assets/stethoscope-F8rh633Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14a-OHeEigYUaB1zDF7X/Pm6XBePm+A\"",
		"mtime": "2026-10-06T18:51:23.347Z",
		"size": 330,
		"path": "../public/assets/stethoscope-F8rh633Z.js"
	},
	"/assets/styles-DyWKbgxV.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"19e36-l3lktO5KwznS5cXUoeKPZ2A2sdY\"",
		"mtime": "2026-10-06T18:51:23.350Z",
		"size": 106038,
		"path": "../public/assets/styles-DyWKbgxV.css"
	},
	"/assets/trash-2-DkN-JJS9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26c-iSdz/nYtSh618c1Y2vZ3daflnn0\"",
		"mtime": "2026-10-06T18:51:23.347Z",
		"size": 620,
		"path": "../public/assets/trash-2-DkN-JJS9.js"
	},
	"/assets/triangle-alert-Ca3lsCHo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-g7PN1wDwfvcwHTVCBVaBq5Fsrxs\"",
		"mtime": "2026-10-06T18:51:23.347Z",
		"size": 253,
		"path": "../public/assets/triangle-alert-Ca3lsCHo.js"
	},
	"/assets/upload-BFmbpUd8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2be-qwwBvSI5994IHEnBGL3v9nQ7UaA\"",
		"mtime": "2026-10-06T18:51:23.347Z",
		"size": 702,
		"path": "../public/assets/upload-BFmbpUd8.js"
	},
	"/assets/useBaseQuery-DVDlEFxy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2254-bRJGVDXgt8kBLgt37qLp/elNMWw\"",
		"mtime": "2026-10-06T18:51:23.347Z",
		"size": 8788,
		"path": "../public/assets/useBaseQuery-DVDlEFxy.js"
	},
	"/assets/useRouter-Cox3-v4z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"212e-A3nkKsEZa+WTLrFde+IVcdUlJj8\"",
		"mtime": "2026-10-06T18:51:23.347Z",
		"size": 8494,
		"path": "../public/assets/useRouter-Cox3-v4z.js"
	},
	"/assets/useSelector-C42uiuO-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"874-tR327t0JjOIuBf0l1YHJZGjhCaI\"",
		"mtime": "2026-10-06T18:51:23.347Z",
		"size": 2164,
		"path": "../public/assets/useSelector-C42uiuO-.js"
	},
	"/assets/useSuspenseQuery-UF5Smg7-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-VRooUiwZcfHYxiyGHSRIMiyIRKg\"",
		"mtime": "2026-10-06T18:51:23.347Z",
		"size": 174,
		"path": "../public/assets/useSuspenseQuery-UF5Smg7-.js"
	},
	"/assets/user-0MWSeJgV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5fc-XpY1zIYW3mgNYSlg913vmUbtbMk\"",
		"mtime": "2026-10-06T18:51:23.347Z",
		"size": 1532,
		"path": "../public/assets/user-0MWSeJgV.js"
	},
	"/assets/nuppy-logo-HPQ2dgMx.png": {
		"type": "image/png",
		"etag": "\"23a612-QdzyhCLE1EqoAi68hU37fykUhEk\"",
		"mtime": "2026-10-06T18:51:23.347Z",
		"size": 2336274,
		"path": "../public/assets/nuppy-logo-HPQ2dgMx.png"
	},
	"/assets/video-BpF412qZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d9-lBVJ9JS3LYkVECo/uLChCmWg2PQ\"",
		"mtime": "2026-10-06T18:51:23.347Z",
		"size": 473,
		"path": "../public/assets/video-BpF412qZ.js"
	},
	"/assets/x-02ASq3Zl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-66TQZYGsx4MHzGKEfaLbbWss4QQ\"",
		"mtime": "2026-10-06T18:51:23.347Z",
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
