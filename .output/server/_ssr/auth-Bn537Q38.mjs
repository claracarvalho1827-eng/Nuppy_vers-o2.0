import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CrwDbVDs.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { C as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as Lock, J as EyeOff, N as MapPin, P as Mail, X as CircleX, Z as CircleCheck, o as User, ot as AtSign, q as Eye } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Bn537Q38.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function normalizeUsername(raw) {
	return raw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9_]/g, "").slice(0, 24);
}
function scorePassword(pwd) {
	let score = 0;
	if (pwd.length >= 6) score++;
	if (pwd.length >= 10) score++;
	if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
	if (/\d/.test(pwd) && /[^\w\s]/.test(pwd)) score++;
	return score;
}
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("login");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPwd, setShowPwd] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [confirmPwd, setConfirmPwd] = (0, import_react.useState)("");
	const [acceptTerms, setAcceptTerms] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (mode !== "signup") return;
		if (!name) return;
		setUsername((prev) => prev === "" ? normalizeUsername(name) : prev);
	}, [name, mode]);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => {
			if (data.user) navigate({
				to: "/home",
				replace: true
			});
		});
	}, [navigate]);
	const pwdScore = (0, import_react.useMemo)(() => scorePassword(password), [password]);
	const pwdLabels = [
		"Muito fraca",
		"Fraca",
		"Ok",
		"Boa",
		"Forte"
	];
	async function handleSubmit(e) {
		e.preventDefault();
		if (mode === "signup") {
			if (name.trim().length < 2) return toast.error("Digite seu nome");
			if (username.length < 3) return toast.error("Escolha um usuário com pelo menos 3 caracteres");
			if (pwdScore < 2) return toast.error("Crie uma senha mais forte");
			if (password !== confirmPwd) return toast.error("As senhas não coincidem");
			if (!acceptTerms) return toast.error("Aceite os termos para continuar");
		}
		setLoading(true);
		try {
			if (mode === "signup") {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: window.location.origin,
						data: {
							display_name: name.trim(),
							full_name: name.trim(),
							username,
							city: city.trim() || null
						}
					}
				});
				if (error) throw error;
				const { data: session } = await supabase.auth.getUser();
				if (session.user && city.trim()) await supabase.from("profiles").update({ city: city.trim() }).eq("id", session.user.id);
				toast.success("Conta criada! Bem-vindo(a) ao Nuppy 🐾");
				navigate({
					to: "/home",
					replace: true
				});
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				toast.success("Boas-vindas de volta!");
				navigate({
					to: "/home",
					replace: true
				});
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Erro ao autenticar";
			const friendly = msg.includes("Invalid login") ? "Email ou senha incorretos" : msg.includes("already registered") || msg.includes("already been registered") ? "Este email já está cadastrado — faça login" : msg.includes("Password should be") ? "Senha muito curta (mínimo 6 caracteres)" : msg;
			toast.error(friendly);
		} finally {
			setLoading(false);
		}
	}
	async function handleGoogle() {
		setLoading(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}/home` }
		});
		if (error) {
			toast.error("Não foi possível entrar com Google");
			setLoading(false);
			return;
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen w-full flex justify-center nuppy-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative w-full max-w-[480px] min-h-screen px-6 pt-6 pb-10 flex flex-col",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 nuppy-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-center font-display text-2xl text-brand",
						children: mode === "login" ? "Bem-vindo! " : "Crie sua conta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm text-muted-foreground mt-1",
						children: mode === "login" ? "Faça login para continuar cuidando do seu melhor amigo" : "Junte-se à comunidade pet do Nuppy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-5 space-y-3",
						children: [
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4" }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "nuppy-input",
										placeholder: "Seu nome",
										required: true,
										value: name,
										onChange: (e) => setName(e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtSign, { className: "size-4" }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "nuppy-input",
										placeholder: "usuario",
										required: true,
										minLength: 3,
										value: username,
										onChange: (e) => setUsername(normalizeUsername(e.target.value))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "nuppy-input",
										placeholder: "Cidade (opcional)",
										value: city,
										onChange: (e) => setCity(e.target.value)
									})
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "nuppy-input",
									type: "email",
									placeholder: "Email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "nuppy-input pr-11",
									type: showPwd ? "text" : "password",
									placeholder: "Senha",
									required: true,
									minLength: 6,
									value: password,
									onChange: (e) => setPassword(e.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPwd((v) => !v),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
									"aria-label": showPwd ? "Ocultar senha" : "Mostrar senha",
									children: showPwd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
								})]
							}),
							mode === "signup" && password && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden flex",
									children: [
										0,
										1,
										2,
										3
									].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `flex-1 mr-0.5 last:mr-0 transition-all ${i < pwdScore ? pwdScore < 2 ? "bg-red-400" : pwdScore < 3 ? "bg-amber-400" : "bg-emerald-500" : "bg-transparent"}` }, i))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-muted-foreground w-14 text-right",
									children: pwdLabels[pwdScore]
								})]
							}),
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "nuppy-input pr-11",
									type: showPwd ? "text" : "password",
									placeholder: "Confirmar senha",
									required: true,
									minLength: 6,
									value: confirmPwd,
									onChange: (e) => setConfirmPwd(e.target.value)
								}), confirmPwd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute right-3 top-1/2 -translate-y-1/2",
									children: confirmPwd === password ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4 text-red-400" })
								})]
							}),
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-start gap-2 text-xs text-muted-foreground pt-1 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: acceptTerms,
									onChange: (e) => setAcceptTerms(e.target.checked),
									className: "mt-0.5 accent-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Concordo com os ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary underline",
										children: "Termos de uso"
									}),
									" e a",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary underline",
										children: "Política de privacidade"
									}),
									"."
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: loading,
								className: "nuppy-btn-primary disabled:opacity-60",
								children: loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Cadastrar"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 my-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "Ou continue com"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleGoogle,
						disabled: loading,
						className: "nuppy-btn-ghost",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), " Continuar com Google"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm mt-5",
						children: mode === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Ainda não tem conta?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMode("signup"),
								className: "font-display text-primary",
								type: "button",
								children: "Criar conta"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Já tem conta?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMode("login"),
								className: "font-display text-primary",
								type: "button",
								children: "Entrar"
							})
						] })
					})
				]
			})
		})
	});
}
function Field({ icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute left-4 top-1/2 -translate-y-1/2 text-primary",
			children: icon
		}), children]
	});
}
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-5",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#EA4335",
			d: "M12 10.2v3.9h5.5c-.24 1.46-1.7 4.28-5.5 4.28-3.31 0-6.01-2.74-6.01-6.12S8.69 6.14 12 6.14c1.88 0 3.14.8 3.86 1.48l2.63-2.54C16.84 3.55 14.62 2.6 12 2.6 6.83 2.6 2.66 6.77 2.66 11.94S6.83 21.28 12 21.28c6.92 0 9.5-4.86 9.5-7.36 0-.5-.06-.88-.13-1.26L12 12.62v-2.42z"
		})
	});
}
//#endregion
export { AuthPage as component };
