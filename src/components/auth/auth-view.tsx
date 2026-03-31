"use client";
import {
  type LoginSchema,
  loginSchema,
  type RegisterSchema,
  registerSchema,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export type AuthTab = "login" | "register";

export type AuthViewProps = {
  defaultTab: AuthTab;
};

const AUTH_COPY = {
  title: "Sign in faster to continue shopping your selected gear.",
  subtitle:
    "Save your wishlist, track orders, and get gear recommendations tailored for studio and stage needs.",
  perks: [
    "Checkout faster with your saved details.",
    "View order history and shipping updates in one place.",
    "Get weekly gear deals exclusive to registered members.",
  ],
  stats: [
    { value: "40K+", label: "Active customers" },
    { value: "4.9", label: "Service rating" },
    { value: "24/7", label: "Live support" },
  ],
} as const;

function getPasswordStrength(password: string): {
  score: number;
  label: string;
} {
  if (password.length === 0) {
    return { score: 0, label: "" };
  }

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { score, label: "Weak" };
  if (score <= 2) return { score, label: "Fair" };
  if (score <= 3) return { score, label: "Good" };
  return { score, label: "Strong" };
}

export default function AuthView({ defaultTab }: AuthViewProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>(defaultTab);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] =
    useState(false);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      remember: false,
    },
    mode: "onSubmit",
  });

  const registerForm = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: true,
    },
    mode: "onSubmit",
  });

  const registerPassword = useWatch({
    control: registerForm.control,
    name: "password",
  });
  const passwordStrength = getPasswordStrength(registerPassword ?? "");

  const switchTab = (tab: AuthTab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    router.replace(tab === "login" ? "/login" : "/register");
  };

  const onSubmitLogin = (values: LoginSchema) => {
    setIsSubmittingLogin(true);

    window.setTimeout(() => {
      setIsSubmittingLogin(false);
      toast.success(
        `Mock login successful for ${values.identifier}. API integration is not enabled yet.`,
      );
      if (pathname !== "/") {
        router.push("/");
      }
    }, 900);
  };

  const onSubmitRegister = (values: RegisterSchema) => {
    setIsSubmittingRegister(true);

    window.setTimeout(() => {
      setIsSubmittingRegister(false);
      toast.success(
        `Mock account for ${values.email} was created successfully. API integration is not enabled yet.`,
      );
      router.replace("/login");
      setActiveTab("login");
      registerForm.reset({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: true,
      });
    }, 1100);
  };

  return (
    <div className="flex min-h-screen items-center bg-[var(--landing-bg)] px-2 py-4 text-[var(--landing-text)] [font-family:var(--font-dm-sans)] lg:py-6">
      <main className="mx-auto grid w-full max-w-[1320px] grid-cols-1 overflow-hidden rounded-[14px] border border-[var(--landing-border)] lg:min-h-[650px] lg:grid-cols-2">
        <section className="relative hidden border-r border-[var(--landing-border)] bg-[var(--landing-card)] p-7 lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute inset-0 [background-size:52px_52px] [background-image:linear-gradient(to_right,var(--landing-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--landing-grid)_1px,transparent_1px)]" />
          <div className="pointer-events-none absolute inset-0 bg-[var(--landing-card)] [mask-image:radial-gradient(ellipse_at_center,transparent_24%,black)]" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,var(--landing-blue-soft-strong)_0%,transparent_72%)]" />

          <div className="relative z-10 max-w-[352px]">
            <span className="mb-6 inline-flex rounded-[3px] border border-[var(--landing-blue-soft-border)] bg-[var(--landing-blue-soft)] px-2.5 py-1 text-[0.75rem] tracking-[0.1em] uppercase text-[var(--landing-tag-text)] [font-family:var(--font-barlow-condensed)]">
              Member Access
            </span>
            <h1 className="text-[clamp(2rem,3.7vw,3.1rem)] leading-[0.9] tracking-[0.02em] [font-family:var(--font-bebas-neue)]">
              {AUTH_COPY.title}
            </h1>
            <p className="mt-3.5 max-w-[320px] text-[0.88rem] leading-[1.55] text-[var(--landing-text-muted)]">
              {AUTH_COPY.subtitle}
            </p>
            <div className="mt-4.5 flex flex-col gap-2.5">
              {AUTH_COPY.perks.map((perk) => (
                <div key={perk} className="flex items-start gap-3">
                  <span className="mt-[0.4rem] inline-flex h-2 w-2 shrink-0 rounded-full bg-[var(--landing-blue)]" />
                  <span className="text-[0.84rem] leading-[1.5] text-[var(--landing-text-muted)]">
                    {perk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-5 flex items-center gap-4 border-t border-[var(--landing-border)] pt-4">
            {AUTH_COPY.stats.map((item, index) => (
              <div key={item.label} className="flex items-center gap-4">
                <div>
                  <p className="text-[1.3rem] leading-none tracking-[0.02em] [font-family:var(--font-bebas-neue)]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[0.62rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                    {item.label}
                  </p>
                </div>
                {index < AUTH_COPY.stats.length - 1 ? (
                  <span className="h-7 w-px bg-[var(--landing-border)]" />
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center bg-[var(--landing-bg)] p-4 lg:p-5">
          <div className="w-full max-w-[392px]">
            <div className="space-y-3.5">
              <Link
                href="/"
                className="inline-flex h-8 items-center gap-1.5 rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-card)] px-2.5 text-[0.78rem] font-medium text-[var(--landing-text-muted)] transition-all duration-200 hover:border-[var(--landing-border-strong)] hover:text-[var(--landing-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--landing-blue-soft-border)]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to Home
              </Link>

              <div className="grid grid-cols-2 rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-card)] p-1">
                <button
                  type="button"
                  onClick={() => switchTab("login")}
                  className={`h-8 rounded-[3px] text-[0.9rem] font-semibold tracking-[0.06em] uppercase transition-colors [font-family:var(--font-barlow-condensed)] ${
                    activeTab === "login"
                      ? "bg-[var(--landing-blue)] text-white"
                      : "text-[var(--landing-text-subtle)] hover:text-[var(--landing-text)]"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => switchTab("register")}
                  className={`h-8 rounded-[3px] text-[0.9rem] font-semibold tracking-[0.06em] uppercase transition-colors [font-family:var(--font-barlow-condensed)] ${
                    activeTab === "register"
                      ? "bg-[var(--landing-blue)] text-white"
                      : "text-[var(--landing-text-subtle)] hover:text-[var(--landing-text)]"
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {activeTab === "login" ? (
              <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} noValidate className="mt-4">
                <h2 className="text-[1.8rem] leading-[0.95] tracking-[0.02em] [font-family:var(--font-bebas-neue)]">
                  Sign In to Your Account
                </h2>
                <p className="mb-3.5 mt-1.5 text-[0.84rem] text-[var(--landing-text-subtle)]">
                  Use your email or username to continue to your account dashboard.
                </p>

                <div className="space-y-3">
                  <label className="block">
                    <span className="mb-1 block text-[0.68rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                      Email or Username
                    </span>
                    <input
                      type="text"
                      autoComplete="username"
                      placeholder="you@example.com"
                      className={`h-9 w-full rounded-[4px] border bg-[var(--landing-card)] px-2.5 text-[0.88rem] text-[var(--landing-text)] outline-none transition-colors placeholder:text-[var(--landing-text-subtle)] ${
                        loginForm.formState.errors.identifier
                          ? "border-[var(--color-error-500)]"
                          : "border-[var(--landing-border)] focus:border-[var(--landing-blue)]"
                      }`}
                      {...loginForm.register("identifier")}
                    />
                    {loginForm.formState.errors.identifier ? (
                      <span className="mt-1.5 block text-[0.8rem] text-[var(--color-error-500)]">
                        {loginForm.formState.errors.identifier.message}
                      </span>
                    ) : null}
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-[0.68rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                      Password
                    </span>
                    <div className="relative">
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className={`h-9 w-full rounded-[4px] border bg-[var(--landing-card)] px-2.5 pr-9 text-[0.88rem] text-[var(--landing-text)] outline-none transition-colors placeholder:text-[var(--landing-text-subtle)] ${
                          loginForm.formState.errors.password
                            ? "border-[var(--color-error-500)]"
                            : "border-[var(--landing-border)] focus:border-[var(--landing-blue)]"
                        }`}
                        {...loginForm.register("password")}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowLoginPassword((previous) => !previous)
                        }
                        className="absolute right-1.5 top-1/2 inline-flex h-5 min-w-8 -translate-y-1/2 items-center justify-center rounded-[4px] px-1 text-[0.64rem] font-medium tracking-[0.03em] text-[var(--landing-text-subtle)] transition-colors hover:text-[var(--landing-text-muted)]"
                        aria-label={
                          showLoginPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showLoginPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {loginForm.formState.errors.password ? (
                      <span className="mt-1.5 block text-[0.8rem] text-[var(--color-error-500)]">
                        {loginForm.formState.errors.password.message}
                      </span>
                    ) : null}
                  </label>
                </div>

                <div className="mb-3.5 mt-2.5 flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-[0.8rem] text-[var(--landing-text-subtle)]">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded-[3px] border-[var(--landing-border)] bg-[var(--landing-card)] text-[var(--landing-blue)] focus:ring-[var(--landing-blue-soft)]"
                      {...loginForm.register("remember")}
                    />
                    Keep me signed in
                  </label>
                  <Link
                    href="#"
                    className="text-[0.8rem] text-[var(--landing-blue-light)] hover:opacity-80"
                  >
                    Forgot password
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingLogin}
                  className="inline-flex h-10 w-full items-center justify-center rounded-[4px] bg-[var(--landing-blue)] text-[0.94rem] font-semibold tracking-[0.05em] text-white transition-all duration-200 hover:bg-[var(--landing-blue-light)] hover:shadow-[0_3px_10px_var(--landing-blue-glow)] disabled:cursor-not-allowed disabled:opacity-60 [font-family:var(--font-barlow-condensed)]"
                >
                  {isSubmittingLogin ? "Signing In..." : "Sign In"}
                </button>

                <div className="my-3 flex items-center gap-2">
                  <span className="h-px flex-1 bg-[var(--landing-border)]" />
                  <span className="text-[0.62rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                    or continue with
                  </span>
                  <span className="h-px flex-1 bg-[var(--landing-border)]" />
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-card)] px-3 text-[0.8rem] text-[var(--landing-text-muted)] transition-colors hover:border-[var(--landing-border-strong)] hover:text-[var(--landing-text)]"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-card)] px-3 text-[0.8rem] text-[var(--landing-text-muted)] transition-colors hover:border-[var(--landing-border-strong)] hover:text-[var(--landing-text)]"
                  >
                    Apple
                  </button>
                </div>
              </form>
            ) : (
              <form
                onSubmit={registerForm.handleSubmit(onSubmitRegister)}
                noValidate
                className="mt-4"
              >
                <h2 className="text-[1.8rem] leading-[0.95] tracking-[0.02em] [font-family:var(--font-bebas-neue)]">
                  Create a New Account
                </h2>
                <p className="mb-3.5 mt-1.5 text-[0.84rem] text-[var(--landing-text-subtle)]">
                  Sign up for free to save your wishlist and track your orders.
                </p>

                <div className="space-y-3">
                  <label className="block">
                    <span className="mb-1 block text-[0.68rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                      Full Name
                    </span>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      className={`h-9 w-full rounded-[4px] border bg-[var(--landing-card)] px-2.5 text-[0.88rem] text-[var(--landing-text)] outline-none transition-colors placeholder:text-[var(--landing-text-subtle)] ${
                        registerForm.formState.errors.fullName
                          ? "border-[var(--color-error-500)]"
                          : "border-[var(--landing-border)] focus:border-[var(--landing-blue)]"
                      }`}
                      {...registerForm.register("fullName")}
                    />
                    {registerForm.formState.errors.fullName ? (
                      <span className="mt-1.5 block text-[0.8rem] text-[var(--color-error-500)]">
                        {registerForm.formState.errors.fullName.message}
                      </span>
                    ) : null}
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-[0.68rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                      Email
                    </span>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={`h-9 w-full rounded-[4px] border bg-[var(--landing-card)] px-2.5 text-[0.88rem] text-[var(--landing-text)] outline-none transition-colors placeholder:text-[var(--landing-text-subtle)] ${
                        registerForm.formState.errors.email
                          ? "border-[var(--color-error-500)]"
                          : "border-[var(--landing-border)] focus:border-[var(--landing-blue)]"
                      }`}
                      {...registerForm.register("email")}
                    />
                    {registerForm.formState.errors.email ? (
                      <span className="mt-1.5 block text-[0.8rem] text-[var(--color-error-500)]">
                        {registerForm.formState.errors.email.message}
                      </span>
                    ) : null}
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-[0.68rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                      Password
                    </span>
                    <div className="relative">
                      <input
                        type={showRegisterPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="At least 8 characters"
                        className={`h-9 w-full rounded-[4px] border bg-[var(--landing-card)] px-2.5 pr-9 text-[0.88rem] text-[var(--landing-text)] outline-none transition-colors placeholder:text-[var(--landing-text-subtle)] ${
                          registerForm.formState.errors.password
                            ? "border-[var(--color-error-500)]"
                            : "border-[var(--landing-border)] focus:border-[var(--landing-blue)]"
                        }`}
                        {...registerForm.register("password")}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowRegisterPassword((previous) => !previous)
                        }
                        className="absolute right-1.5 top-1/2 inline-flex h-5 min-w-8 -translate-y-1/2 items-center justify-center rounded-[4px] px-1 text-[0.64rem] font-medium tracking-[0.03em] text-[var(--landing-text-subtle)] transition-colors hover:text-[var(--landing-text-muted)]"
                        aria-label={
                          showRegisterPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showRegisterPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    <div className="mt-2 flex gap-1.5">
                      {[1, 2, 3, 4].map((segment) => (
                        <span
                          key={segment}
                          className={`h-1.5 flex-1 rounded-full ${
                            passwordStrength.score >= segment
                              ? "bg-[var(--landing-blue)]"
                              : "bg-[var(--landing-border)]"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-[0.68rem] text-[var(--landing-text-subtle)]">
                      {passwordStrength.label}
                    </p>
                    {registerForm.formState.errors.password ? (
                      <span className="mt-1.5 block text-[0.8rem] text-[var(--color-error-500)]">
                        {registerForm.formState.errors.password.message}
                      </span>
                    ) : null}
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-[0.68rem] tracking-[0.1em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                      Confirm Password
                    </span>
                    <div className="relative">
                      <input
                        type={showRegisterConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Re-enter password"
                        className={`h-9 w-full rounded-[4px] border bg-[var(--landing-card)] px-2.5 pr-9 text-[0.88rem] text-[var(--landing-text)] outline-none transition-colors placeholder:text-[var(--landing-text-subtle)] ${
                          registerForm.formState.errors.confirmPassword
                            ? "border-[var(--color-error-500)]"
                            : "border-[var(--landing-border)] focus:border-[var(--landing-blue)]"
                        }`}
                        {...registerForm.register("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowRegisterConfirmPassword(
                            (previous) => !previous,
                          )
                        }
                        className="absolute right-1.5 top-1/2 inline-flex h-5 min-w-8 -translate-y-1/2 items-center justify-center rounded-[4px] px-1 text-[0.64rem] font-medium tracking-[0.03em] text-[var(--landing-text-subtle)] transition-colors hover:text-[var(--landing-text-muted)]"
                        aria-label={
                          showRegisterConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showRegisterConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {registerForm.formState.errors.confirmPassword ? (
                      <span className="mt-1.5 block text-[0.8rem] text-[var(--color-error-500)]">
                        {registerForm.formState.errors.confirmPassword.message}
                      </span>
                    ) : null}
                  </label>
                </div>

                <div className="mb-3.5 mt-2.5">
                  <label className="inline-flex items-start gap-2 text-[0.8rem] leading-[1.4] text-[var(--landing-text-subtle)]">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded-[3px] border-[var(--landing-border)] bg-[var(--landing-card)] text-[var(--landing-blue)] focus:ring-[var(--landing-blue-soft)]"
                      {...registerForm.register("agreeTerms")}
                    />
                    I agree to the{" "}
                    <Link
                      href="#"
                      className="text-[var(--landing-blue-light)] hover:opacity-80"
                    >
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      className="text-[var(--landing-blue-light)] hover:opacity-80"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                  {registerForm.formState.errors.agreeTerms ? (
                    <span className="mt-1.5 block text-[0.8rem] text-[var(--color-error-500)]">
                      {registerForm.formState.errors.agreeTerms.message}
                    </span>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingRegister}
                  className="inline-flex h-10 w-full items-center justify-center rounded-[4px] bg-[var(--landing-blue)] text-[0.94rem] font-semibold tracking-[0.05em] text-white transition-all duration-200 hover:bg-[var(--landing-blue-light)] hover:shadow-[0_3px_10px_var(--landing-blue-glow)] disabled:cursor-not-allowed disabled:opacity-60 [font-family:var(--font-barlow-condensed)]"
                >
                  {isSubmittingRegister ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
