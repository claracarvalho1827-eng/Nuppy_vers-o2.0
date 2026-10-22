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
	"/assets/ImageUpload-CFqLCJ1W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62c-yQlapY/iH6CWGnF9fsl2fENPLXI\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 1580,
		"path": "../public/assets/ImageUpload-CFqLCJ1W.js"
	},
	"/assets/MobileShell-Dd1pSQ-J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e8-6H0OxUBkuarg8lHITgCvJVglXi8\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 2536,
		"path": "../public/assets/MobileShell-Dd1pSQ-J.js"
	},
	"/assets/auth-XAXV5bSv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d5-E36jfJhbREAb8bDRGHC9B4eIZsw\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 8405,
		"path": "../public/assets/auth-XAXV5bSv.js"
	},
	"/assets/cachorro-DwYQ2z59.png": {
		"type": "image/png",
		"etag": "\"285d4-JbAf9SwN4Ud+xr+a6CN7mU1eUFI\"",
		"mtime": "2026-10-22T20:49:39.415Z",
		"size": 165332,
		"path": "../public/assets/cachorro-DwYQ2z59.png"
	},
	"/assets/camera-oCUuiOsu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"144-8pztInZ0gNhtLFi4j5PhOH2nOZE\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 324,
		"path": "../public/assets/camera-oCUuiOsu.js"
	},
	"/assets/chevron-left-BAVeUUid.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-NT3k8IxkoeZrwRqm0aZ+/duo3GA\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 118,
		"path": "../public/assets/chevron-left-BAVeUUid.js"
	},
	"/assets/chevron-right-DJ1ncv55.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-2NdYQKm59jpkkvBmrb2y4xIeVGw\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 118,
		"path": "../public/assets/chevron-right-DJ1ncv55.js"
	},
	"/assets/comunidade._slug-DXKJMuzd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"233f-Sq2oR9VS10UpRnEzCiDrXVO1VKM\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 9023,
		"path": "../public/assets/comunidade._slug-DXKJMuzd.js"
	},
	"/assets/comunidade._slug-DjVLJ2Yq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fc-Y3DoL/gu5lhBXTl2nQ0XqtH+1Og\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 508,
		"path": "../public/assets/comunidade._slug-DjVLJ2Yq.js"
	},
	"/assets/comunidade._slug-mY50Ql6Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c3-m+vOmOzfYLNUfjdQe1Q+oSVR024\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 963,
		"path": "../public/assets/comunidade._slug-mY50Ql6Y.js"
	},
	"/assets/comunidades-C0nkb6Lm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1600-Dj9wXKrMl+RoZQ0xcRJpvvJ4ADg\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 5632,
		"path": "../public/assets/comunidades-C0nkb6Lm.js"
	},
	"/assets/configuracoes.contato-D1l88nn1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5dd-h4251DXm+82d5iPmXmKwcu4XafE\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 1501,
		"path": "../public/assets/configuracoes.contato-D1l88nn1.js"
	},
	"/assets/configuracoes.index-DNpoLbbF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1312-jO1uY4vuvI1XL2Tls0gH22YoWWU\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 4882,
		"path": "../public/assets/configuracoes.index-DNpoLbbF.js"
	},
	"/assets/configuracoes.privacidade-politica-C7DqjKT7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"605-o/o1Cnqkgy8KmXbX1lLsyizeEBQ\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 1541,
		"path": "../public/assets/configuracoes.privacidade-politica-C7DqjKT7.js"
	},
	"/assets/configuracoes.privacidade-zimwTa7I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4fc-WmdInQmrIpJwKkdvyOYRnieQ5do\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 1276,
		"path": "../public/assets/configuracoes.privacidade-zimwTa7I.js"
	},
	"/assets/configuracoes.termos-BQ9crqj4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d9-8+0cpJMph72miW1p4bnTmblLvMY\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 1497,
		"path": "../public/assets/configuracoes.termos-BQ9crqj4.js"
	},
	"/assets/dist-B4yIY0Pt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"49f6-RxODDskmzXxM7QoLhvVx7B3jTBw\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 18934,
		"path": "../public/assets/dist-B4yIY0Pt.js"
	},
	"/assets/estabelecimento._id--Vg8bn4X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"216-M6hegQEsWXierzgDemZrAvkRWO0\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 534,
		"path": "../public/assets/estabelecimento._id--Vg8bn4X.js"
	},
	"/assets/estabelecimento._id-BxGF9XaG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30bf-YstuENF+MwfQtkNTfLsjatrvTzk\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 12479,
		"path": "../public/assets/estabelecimento._id-BxGF9XaG.js"
	},
	"/assets/estabelecimento._id-CGpd9u8S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d7-Hlj71XAWeBRuppKTxkLJAqr4uKk\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 471,
		"path": "../public/assets/estabelecimento._id-CGpd9u8S.js"
	},
	"/assets/estabelecimentos-gfoSfxeK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1502-FBN6EUx/IzxOtotQZN2BiN3Pyxk\"",
		"mtime": "2026-10-22T20:49:39.394Z",
		"size": 5378,
		"path": "../public/assets/estabelecimentos-gfoSfxeK.js"
	},
	"/assets/gato-CT6BHiEY.png": {
		"type": "image/png",
		"etag": "\"20d5a-JaVNm4XXXu7UFzlmA+tE59WEXAc\"",
		"mtime": "2026-10-22T20:49:39.415Z",
		"size": 134490,
		"path": "../public/assets/gato-CT6BHiEY.png"
	},
	"/assets/home-DF6fYcnc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c1e-tG06XVHxNXNnFxRLDkhMq6SwjN0\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 3102,
		"path": "../public/assets/home-DF6fYcnc.js"
	},
	"/assets/instagram-JzZQdVYE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11c-e4w/Pss78QagGet+hRHTwoVKD/s\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 284,
		"path": "../public/assets/instagram-JzZQdVYE.js"
	},
	"/assets/index-C_YipLc-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"81dcb-26cxoTdrJjGgk+p4cmW3dl02Xjg\"",
		"mtime": "2026-10-22T20:49:39.370Z",
		"size": 531915,
		"path": "../public/assets/index-C_YipLc-.js"
	},
	"/assets/link-gyWqUBjk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25c3-7/xRR/SuV1Ltzi5y6n/sU0TIaL8\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 9667,
		"path": "../public/assets/link-gyWqUBjk.js"
	},
	"/assets/loader-circle-DjuvwKTn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"84-1/82h60CP7so9v5JImtZEd6qpdU\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 132,
		"path": "../public/assets/loader-circle-DjuvwKTn.js"
	},
	"/assets/mail-D0b7a9l8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c9-Pu3lb0+1mc2+jo9T5qrqNBGWpxs\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 201,
		"path": "../public/assets/mail-D0b7a9l8.js"
	},
	"/assets/map-Dd53SYJZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d-ztlPEDVvdb7PsQOsMRdBcrehXw0\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 413,
		"path": "../public/assets/map-Dd53SYJZ.js"
	},
	"/assets/mic-CxxZi1lA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df-At3VhMoRQEs0bJStFpT9wdaHUE8\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 223,
		"path": "../public/assets/mic-CxxZi1lA.js"
	},
	"/assets/passaro-Cw80xXel.png": {
		"type": "image/png",
		"etag": "\"2e951-YVsgVqCIC2N/pVlyQ4eLi3cLAAo\"",
		"mtime": "2026-10-22T20:49:39.447Z",
		"size": 190801,
		"path": "../public/assets/passaro-Cw80xXel.png"
	},
	"/assets/peixe-Vzxxgr6f.png": {
		"type": "image/png",
		"etag": "\"39e5d-FprhLaDD5zQbRcI4bWVT6Et5ct0\"",
		"mtime": "2026-10-22T20:49:39.447Z",
		"size": 237149,
		"path": "../public/assets/peixe-Vzxxgr6f.png"
	},
	"/assets/peludinho-DgznguLx.png": {
		"type": "image/png",
		"etag": "\"1d123-V3dy1UAgHDmKEKg8jxAV8wAsk/g\"",
		"mtime": "2026-10-22T20:49:39.447Z",
		"size": 119075,
		"path": "../public/assets/peludinho-DgznguLx.png"
	},
	"/assets/perfil-DXSOdIlZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ee6-gqWOcMKqVFO++6L4iDi9SG3b/lM\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 12006,
		"path": "../public/assets/perfil-DXSOdIlZ.js"
	},
	"/assets/pet._petId-B7Pb62iv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e44-r/JzFKETzXDM5DZ6yiYzzsBOztY\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 11844,
		"path": "../public/assets/pet._petId-B7Pb62iv.js"
	},
	"/assets/pet.novo-D62wnG3h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a83-QxmNTo9HcWEr2Ube1AIINskKyxs\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 10883,
		"path": "../public/assets/pet.novo-D62wnG3h.js"
	},
	"/assets/phone-LR7jpdqb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-2sTpxa3r+FMguubXoqi7YUy8aBY\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 310,
		"path": "../public/assets/phone-LR7jpdqb.js"
	},
	"/assets/plus-DLKonWj5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"149-AvKgb6xiygKMZBdIb052TgA5DGQ\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 329,
		"path": "../public/assets/plus-DLKonWj5.js"
	},
	"/assets/root-CDpNo7ef.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93-DAIYjs/n7phUvy8BJw/G7UeEE1c\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 147,
		"path": "../public/assets/root-CDpNo7ef.js"
	},
	"/assets/route-Drzw08s3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-EMRxNQP/C8s4nLJB4LurgLtbkvk\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 139,
		"path": "../public/assets/route-Drzw08s3.js"
	},
	"/assets/routes-BmuZ_QgO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fc-4dMVsb6AMF+liBa04/5fjeI6Y8Y\"",
		"mtime": "2026-10-22T20:49:39.414Z",
		"size": 508,
		"path": "../public/assets/routes-BmuZ_QgO.js"
	},
	"/assets/search-wXUfl3Pb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2-+h6zvqS7p2+7JUFUu8VCMO79LVw\"",
		"mtime": "2026-10-22T20:49:39.414Z",
		"size": 162,
		"path": "../public/assets/search-wXUfl3Pb.js"
	},
	"/assets/servicos-C-7kMYS1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19ba-43nU3cSpdk+nJv9zYeyDcZFJSlY\"",
		"mtime": "2026-10-22T20:49:39.414Z",
		"size": 6586,
		"path": "../public/assets/servicos-C-7kMYS1.js"
	},
	"/assets/social-D_c04Fti.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5346-V05PVhjWODq7JhqKP2d6ogJIxio\"",
		"mtime": "2026-10-22T20:49:39.414Z",
		"size": 21318,
		"path": "../public/assets/social-D_c04Fti.js"
	},
	"/assets/sparkles-C3tWqZIi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-u/thwCoub17yU4wnfGT+Vx665+s\"",
		"mtime": "2026-10-22T20:49:39.414Z",
		"size": 482,
		"path": "../public/assets/sparkles-C3tWqZIi.js"
	},
	"/assets/star-D-jMriRB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cc-xipQKD0Bh8OjKDduvr/PG9howkQ\"",
		"mtime": "2026-10-22T20:49:39.414Z",
		"size": 460,
		"path": "../public/assets/star-D-jMriRB.js"
	},
	"/assets/lock-DAUHU5CQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c2-9mlF3LvSq16ol5xrqIH5mefx+1I\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 194,
		"path": "../public/assets/lock-DAUHU5CQ.js"
	},
	"/assets/local-NS3QWYvZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28f8-oc3HYSubnQ+g6cZa9YN50mW5w8I\"",
		"mtime": "2026-10-22T20:49:39.397Z",
		"size": 10488,
		"path": "../public/assets/local-NS3QWYvZ.js"
	},
	"/assets/stethoscope-F8rh633Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14a-OHeEigYUaB1zDF7X/Pm6XBePm+A\"",
		"mtime": "2026-10-22T20:49:39.414Z",
		"size": 330,
		"path": "../public/assets/stethoscope-F8rh633Z.js"
	},
	"/assets/styles-Cp4Uls--.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"19df2-w6ZoOSi0YX6IAyahcVr8DZ6K76c\"",
		"mtime": "2026-10-22T20:49:39.447Z",
		"size": 105970,
		"path": "../public/assets/styles-Cp4Uls--.css"
	},
	"/assets/trash-2-DkN-JJS9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26c-iSdz/nYtSh618c1Y2vZ3daflnn0\"",
		"mtime": "2026-10-22T20:49:39.415Z",
		"size": 620,
		"path": "../public/assets/trash-2-DkN-JJS9.js"
	},
	"/assets/triangle-alert-Ca3lsCHo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-g7PN1wDwfvcwHTVCBVaBq5Fsrxs\"",
		"mtime": "2026-10-22T20:49:39.415Z",
		"size": 253,
		"path": "../public/assets/triangle-alert-Ca3lsCHo.js"
	},
	"/assets/upload-CgZRs0bu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"233-m662y/x3IljUJC9jRQ5Z68be5xs\"",
		"mtime": "2026-10-22T20:49:39.415Z",
		"size": 563,
		"path": "../public/assets/upload-CgZRs0bu.js"
	},
	"/assets/useBaseQuery-OsW-tutZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2259-VEXY+F4dwSM5SyAxKcOxC50v64s\"",
		"mtime": "2026-10-22T20:49:39.415Z",
		"size": 8793,
		"path": "../public/assets/useBaseQuery-OsW-tutZ.js"
	},
	"/assets/nuppy-logo-HPQ2dgMx.png": {
		"type": "image/png",
		"etag": "\"23a612-QdzyhCLE1EqoAi68hU37fykUhEk\"",
		"mtime": "2026-10-22T20:49:39.433Z",
		"size": 2336274,
		"path": "../public/assets/nuppy-logo-HPQ2dgMx.png"
	},
	"/assets/useRouter-Cox3-v4z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"212e-A3nkKsEZa+WTLrFde+IVcdUlJj8\"",
		"mtime": "2026-10-22T20:49:39.415Z",
		"size": 8494,
		"path": "../public/assets/useRouter-Cox3-v4z.js"
	},
	"/assets/useSelector-C42uiuO-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"874-tR327t0JjOIuBf0l1YHJZGjhCaI\"",
		"mtime": "2026-10-22T20:49:39.415Z",
		"size": 2164,
		"path": "../public/assets/useSelector-C42uiuO-.js"
	},
	"/assets/useSuspenseQuery-Dsjqlleb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-em4/EJLblNY0MZumFF6uXbTx/KY\"",
		"mtime": "2026-10-22T20:49:39.415Z",
		"size": 174,
		"path": "../public/assets/useSuspenseQuery-Dsjqlleb.js"
	},
	"/assets/user-0MWSeJgV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5fc-XpY1zIYW3mgNYSlg913vmUbtbMk\"",
		"mtime": "2026-10-22T20:49:39.415Z",
		"size": 1532,
		"path": "../public/assets/user-0MWSeJgV.js"
	},
	"/assets/video-BpF412qZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d9-lBVJ9JS3LYkVECo/uLChCmWg2PQ\"",
		"mtime": "2026-10-22T20:49:39.415Z",
		"size": 473,
		"path": "../public/assets/video-BpF412qZ.js"
	},
	"/assets/x-02ASq3Zl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-66TQZYGsx4MHzGKEfaLbbWss4QQ\"",
		"mtime": "2026-10-22T20:49:39.415Z",
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
