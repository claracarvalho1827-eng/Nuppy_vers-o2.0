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
	"/assets/ImageUpload-CsLJqvZs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"603-Q3ou1awfxZy7wkpvKYuwXPro6Dc\"",
		"mtime": "2026-10-06T17:41:24.417Z",
		"size": 1539,
		"path": "../public/assets/ImageUpload-CsLJqvZs.js"
	},
	"/assets/MobileShell-DyKyQ1-S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"990-YbsMBEyxBYS4/hNtysKRBec0vt0\"",
		"mtime": "2026-10-06T17:41:24.417Z",
		"size": 2448,
		"path": "../public/assets/MobileShell-DyKyQ1-S.js"
	},
	"/assets/NuppyLogo-DMapESAG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed-uFs9icZBSeuK8N4Qo4MKhOUEHko\"",
		"mtime": "2026-10-06T17:41:24.417Z",
		"size": 237,
		"path": "../public/assets/NuppyLogo-DMapESAG.js"
	},
	"/assets/auth-jzzZkXP7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c5-RzLG3FbmNBPMkDEEJxRVpvmKf2U\"",
		"mtime": "2026-10-06T17:41:24.417Z",
		"size": 8901,
		"path": "../public/assets/auth-jzzZkXP7.js"
	},
	"/assets/camera-2h7NlPlU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"144-4VCv//5uyfKgYWEUD6QmXrWA00U\"",
		"mtime": "2026-10-06T17:41:24.417Z",
		"size": 324,
		"path": "../public/assets/camera-2h7NlPlU.js"
	},
	"/assets/chevron-left-D1KDeiW5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-2znkTUbVUUu9YUr0LmLWkg0I3ps\"",
		"mtime": "2026-10-06T17:41:24.417Z",
		"size": 118,
		"path": "../public/assets/chevron-left-D1KDeiW5.js"
	},
	"/assets/chevron-right-BGW9PH0p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-kOeadRKBcxCQzd/6sp4p5XHNqzY\"",
		"mtime": "2026-10-06T17:41:24.417Z",
		"size": 118,
		"path": "../public/assets/chevron-right-BGW9PH0p.js"
	},
	"/assets/comunidade._slug-6C_x93HC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"231b-jmzrYnh8P/CRIm8rTSHzDknEEKw\"",
		"mtime": "2026-10-06T17:41:24.417Z",
		"size": 8987,
		"path": "../public/assets/comunidade._slug-6C_x93HC.js"
	},
	"/assets/comunidade._slug-CoE6RcCP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c3-ql9ntYZESMaRhP6/mlim57DIqY8\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 963,
		"path": "../public/assets/comunidade._slug-CoE6RcCP.js"
	},
	"/assets/comunidade._slug-CyT-GrjX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fc-KVpqfpgfr77dPCMYnCtI6nb5Njc\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 508,
		"path": "../public/assets/comunidade._slug-CyT-GrjX.js"
	},
	"/assets/comunidades-D5fg1ODT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"162f-yoKpMJWJMPzqPJrjDk2uDFyPbyk\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 5679,
		"path": "../public/assets/comunidades-D5fg1ODT.js"
	},
	"/assets/configuracoes.contato-DY6ZsNe3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5dd-lHewlketAFk8P8cU6RJLDoFHgvQ\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 1501,
		"path": "../public/assets/configuracoes.contato-DY6ZsNe3.js"
	},
	"/assets/configuracoes.index-CVwCGcOj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1312-loX4JQ2V/xnDH2ecuAaAmUJpM44\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 4882,
		"path": "../public/assets/configuracoes.index-CVwCGcOj.js"
	},
	"/assets/configuracoes.privacidade-B-4-Kiio.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4fc-wvazyA+nYnnYCaaStgC73tFqxak\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 1276,
		"path": "../public/assets/configuracoes.privacidade-B-4-Kiio.js"
	},
	"/assets/configuracoes.privacidade-politica-Lnt-QLqw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"605-HDxhhfT6Eum6XMNKuSVqFPpeBoA\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 1541,
		"path": "../public/assets/configuracoes.privacidade-politica-Lnt-QLqw.js"
	},
	"/assets/configuracoes.termos-zlTfaQa7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d9-ZN7b2gOYEBB2tjibztDwagFPdzM\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 1497,
		"path": "../public/assets/configuracoes.termos-zlTfaQa7.js"
	},
	"/assets/dist-r-VdnnHE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"49fa-79aJ5Vk4O3E+fiPrAqG3iJiXQ38\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 18938,
		"path": "../public/assets/dist-r-VdnnHE.js"
	},
	"/assets/estabelecimento._id-BMyFRaKF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"216-RYAUFnLTGwqBaE4yMokUNByD2cc\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 534,
		"path": "../public/assets/estabelecimento._id-BMyFRaKF.js"
	},
	"/assets/estabelecimento._id-Dr3mp65c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"310b-l+FKuehDtXUsQRGACEjNht3dVsc\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 12555,
		"path": "../public/assets/estabelecimento._id-Dr3mp65c.js"
	},
	"/assets/estabelecimento._id-pPGItyzU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d7-NtXEPZQ+/u6ks9u+uRdf0hRSvqk\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 471,
		"path": "../public/assets/estabelecimento._id-pPGItyzU.js"
	},
	"/assets/estabelecimentos-BizZu_zD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"155e-MEmGaMj4r8Rg6qPZuH85gjHjvEk\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 5470,
		"path": "../public/assets/estabelecimentos-BizZu_zD.js"
	},
	"/assets/home-uzoSLPg0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1331-ngSaplFEY6obtEmBmTZzZ+6z58I\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 4913,
		"path": "../public/assets/home-uzoSLPg0.js"
	},
	"/assets/index-C0Hagspp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f20c-RyuqsgrvQ/6Tf4ZhXtlNjHXYqyU\"",
		"mtime": "2026-10-06T17:41:24.416Z",
		"size": 520716,
		"path": "../public/assets/index-C0Hagspp.js"
	},
	"/assets/link-yXiCwlO_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12ec-jY877hP/IvSlOWsSmgQbbaxmB+8\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 4844,
		"path": "../public/assets/link-yXiCwlO_.js"
	},
	"/assets/instagram-CmukCROL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11c-2+gt6YPN92t4zDxT9N5jWfs4wxU\"",
		"mtime": "2026-10-06T17:41:24.418Z",
		"size": 284,
		"path": "../public/assets/instagram-CmukCROL.js"
	},
	"/assets/local-SaotDnwY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2944-30n4iMCa+pJzgy+Fhr4lYPVA/sE\"",
		"mtime": "2026-10-06T17:41:24.419Z",
		"size": 10564,
		"path": "../public/assets/local-SaotDnwY.js"
	},
	"/assets/lock-DjMoAuNY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c2-2o5bfatDpoggnjTAAvj3X6ieZjI\"",
		"mtime": "2026-10-06T17:41:24.419Z",
		"size": 194,
		"path": "../public/assets/lock-DjMoAuNY.js"
	},
	"/assets/map-BhoMiQFE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d-C1lBvxg/ajSTPEhDWopP/L4W4wk\"",
		"mtime": "2026-10-06T17:41:24.419Z",
		"size": 413,
		"path": "../public/assets/map-BhoMiQFE.js"
	},
	"/assets/message-circle-Cn-3dqDT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e5-ELt+/qomsqASDocdUyJ6uozPZsg\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 229,
		"path": "../public/assets/message-circle-Cn-3dqDT.js"
	},
	"/assets/mic-CWKeWVhQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df-I8IgA0kVxFoBqwq+c1NnBxHPYys\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 223,
		"path": "../public/assets/mic-CWKeWVhQ.js"
	},
	"/assets/perfil-BHPUfaen.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ac3-VPdYkyun7c8gDrfZWw42JNnO8Zg\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 10947,
		"path": "../public/assets/perfil-BHPUfaen.js"
	},
	"/assets/pet._petId-DmvM3yIc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e4d-LtSBMQJwexb8npfZEBYEscwLjpE\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 11853,
		"path": "../public/assets/pet._petId-DmvM3yIc.js"
	},
	"/assets/pet.novo-CAsGxbGd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a83-ALl63jrEC6f7IFu9dTgaJQZVljE\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 10883,
		"path": "../public/assets/pet.novo-CAsGxbGd.js"
	},
	"/assets/phone-ByEtmCu2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-I0cDE3JXFcUqlIqA+fkOokV3iz4\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 310,
		"path": "../public/assets/phone-ByEtmCu2.js"
	},
	"/assets/plus-jHze76KW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-7xNxucSLUAQ0TrEFetvsHKsypZM\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 141,
		"path": "../public/assets/plus-jHze76KW.js"
	},
	"/assets/react-dom-Csjl5yxH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd8-6sthv81qsLMU4tqyO4JAtohLt9E\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 3544,
		"path": "../public/assets/react-dom-Csjl5yxH.js"
	},
	"/assets/redirect-DnLf-3Zd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-OKGUrSof3kF11Yz1L80m8oAVyB4\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 644,
		"path": "../public/assets/redirect-DnLf-3Zd.js"
	},
	"/assets/route-B7IGt6mw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-a+lChwF10ZyLIT1FLwE1xw7rvVQ\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 139,
		"path": "../public/assets/route-B7IGt6mw.js"
	},
	"/assets/routes-BUdxV9jQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fc-2voR+S/ZcTFsFlAPO9j/PQ/918g\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 508,
		"path": "../public/assets/routes-BUdxV9jQ.js"
	},
	"/assets/search-DskCiKjt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2-JQ2+5bc9mcmAEM0SJ3tyRUbaRB8\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 162,
		"path": "../public/assets/search-DskCiKjt.js"
	},
	"/assets/servicos-DqmqsyYi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19c7-4tU6ILVmLEgJ5upCM1zoKrLfY2A\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 6599,
		"path": "../public/assets/servicos-DqmqsyYi.js"
	},
	"/assets/social-2qEoWogO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5322-/K3GcH1wA/nXNGZ7HJEaEQiGsD8\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 21282,
		"path": "../public/assets/social-2qEoWogO.js"
	},
	"/assets/sparkles--CBPYSP2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-26Jw2rWSC5AdbVN0JvFpixJVgJE\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 482,
		"path": "../public/assets/sparkles--CBPYSP2.js"
	},
	"/assets/star-CyLTCPtG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cc-/9fJW2pXY88gzY7a+vsaO5/AqsQ\"",
		"mtime": "2026-10-06T17:41:24.421Z",
		"size": 460,
		"path": "../public/assets/star-CyLTCPtG.js"
	},
	"/assets/stethoscope-Bb7Ns_5B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14a-ol5FCTJIz1+/vjbRhXseT767Pyk\"",
		"mtime": "2026-10-06T17:41:24.422Z",
		"size": 330,
		"path": "../public/assets/stethoscope-Bb7Ns_5B.js"
	},
	"/assets/styles-gMpjgDQt.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1a032-dqkeRCvCpT7A0kUi5uBUoHyesGk\"",
		"mtime": "2026-10-06T17:41:24.430Z",
		"size": 106546,
		"path": "../public/assets/styles-gMpjgDQt.css"
	},
	"/assets/trash-2-D633K0Ve.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26c-Td+2/iFdSuCYbD2Z8ptK64JGeZs\"",
		"mtime": "2026-10-06T17:41:24.422Z",
		"size": 620,
		"path": "../public/assets/trash-2-D633K0Ve.js"
	},
	"/assets/triangle-alert-6nZIvmNW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-FWspERW7lBOASDhehCQ0+FDxFhU\"",
		"mtime": "2026-10-06T17:41:24.422Z",
		"size": 253,
		"path": "../public/assets/triangle-alert-6nZIvmNW.js"
	},
	"/assets/mail-DTiePrHR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c9-K+WHQxMmO8BatzS7tsEK3mcNw4Q\"",
		"mtime": "2026-10-06T17:41:24.419Z",
		"size": 201,
		"path": "../public/assets/mail-DTiePrHR.js"
	},
	"/assets/useBaseQuery-CNv1L16H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2254-cqGjyNRLfmbV4lNs1PJAHWXnzJs\"",
		"mtime": "2026-10-06T17:41:24.422Z",
		"size": 8788,
		"path": "../public/assets/useBaseQuery-CNv1L16H.js"
	},
	"/assets/useRouter-DeDOna9C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"234e-Loeqy2p7pFuxFqrID3iwesw38+o\"",
		"mtime": "2026-10-06T17:41:24.422Z",
		"size": 9038,
		"path": "../public/assets/useRouter-DeDOna9C.js"
	},
	"/assets/useStore-zaqYljoN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"486a-MZq2tSH3zxRJ1RPVivdWrZdfnno\"",
		"mtime": "2026-10-06T17:41:24.422Z",
		"size": 18538,
		"path": "../public/assets/useStore-zaqYljoN.js"
	},
	"/assets/useSuspenseQuery-BpLBVoDj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-KrcK9VneM1/90ny5pcTvT5eTuk0\"",
		"mtime": "2026-10-06T17:41:24.422Z",
		"size": 174,
		"path": "../public/assets/useSuspenseQuery-BpLBVoDj.js"
	},
	"/assets/user-hMVS64GK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5fc-h3/hq9H2hiFUc5JFMHEZFPOggVk\"",
		"mtime": "2026-10-06T17:41:24.422Z",
		"size": 1532,
		"path": "../public/assets/user-hMVS64GK.js"
	},
	"/assets/video-VwnQ6oS9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d9-oWY0NV4apRzCtUL7GQSpSLcO49k\"",
		"mtime": "2026-10-06T17:41:24.422Z",
		"size": 473,
		"path": "../public/assets/video-VwnQ6oS9.js"
	},
	"/assets/x-BLE16U3L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-Gm7KhqTnRkouBrW3tLL+nhRU3L8\"",
		"mtime": "2026-10-06T17:41:24.422Z",
		"size": 142,
		"path": "../public/assets/x-BLE16U3L.js"
	},
	"/assets/upload-D22FQmYc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2be-PxipTbXtsoh0eZzgyamsfmWAfWY\"",
		"mtime": "2026-10-06T17:41:24.422Z",
		"size": 702,
		"path": "../public/assets/upload-D22FQmYc.js"
	},
	"/assets/nuppy-logo-HPQ2dgMx.png": {
		"type": "image/png",
		"etag": "\"23a612-QdzyhCLE1EqoAi68hU37fykUhEk\"",
		"mtime": "2026-10-06T17:41:24.422Z",
		"size": 2336274,
		"path": "../public/assets/nuppy-logo-HPQ2dgMx.png"
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
