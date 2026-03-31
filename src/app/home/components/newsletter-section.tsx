"use client";

import { newsletterData } from "@/app/home/data/storefront";
import {
  newsletterSchema,
  type NewsletterSchema,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

type SubmitState = "idle" | "success" | "error";

const primaryButtonClass =
  "inline-flex h-12 w-full items-center justify-center rounded-[4px] border border-transparent bg-[var(--landing-blue)] px-5 text-[0.95rem] font-semibold tracking-[0.05em] text-white transition-all duration-200 hover:bg-[var(--landing-blue-light)] hover:shadow-[0_3px_10px_var(--landing-blue-glow)] disabled:cursor-not-allowed disabled:opacity-70 [font-family:var(--font-barlow-condensed)]";

export default function NewsletterSection() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const form = useForm<NewsletterSchema>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: NewsletterSchema) => {
    setSubmitState("idle");
    setStatusMessage("");

    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    if (values.email.toLowerCase().endsWith("@example.com")) {
      setSubmitState("error");
      setStatusMessage(newsletterData.errorMessage);
      return;
    }

    setSubmitState("success");
    setStatusMessage(newsletterData.successMessage);
    form.reset();
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <div
          data-aos="fade-up"
          className="rounded-[12px] border border-[var(--landing-border)] bg-[var(--landing-card)] px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10"
        >
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,430px)] lg:items-end lg:gap-8">
            <div>
              <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]">
                {newsletterData.eyebrow}
              </p>
              <h3 className="mt-2 text-[clamp(1.95rem,8vw,2.9rem)] leading-[0.95] tracking-[0.02em] text-[var(--landing-text)] [font-family:var(--font-bebas-neue)]">
                {newsletterData.title}
              </h3>
              <p className="mt-3 max-w-[54ch] text-[0.98rem] leading-[1.65] text-[var(--landing-text-muted)]">
                {newsletterData.description}
              </p>
              <p className="mt-3 text-[0.82rem] leading-[1.55] text-[var(--landing-text-subtle)]">
                {newsletterData.helperText}
              </p>
            </div>

            <form
              className="grid gap-3"
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <label
                htmlFor="newsletter-email"
                className="text-[0.72rem] font-semibold tracking-[0.11em] uppercase text-[var(--landing-text-subtle)] [font-family:var(--font-barlow-condensed)]"
              >
                Work email
              </label>
              <input
                id="newsletter-email"
                type="email"
                className="h-12 w-full rounded-[4px] border border-[var(--landing-border)] bg-[var(--landing-bg-2)] px-4 text-[0.96rem] text-[var(--landing-text)] outline-none transition-colors duration-200 placeholder:text-[var(--landing-text-subtle)] focus:border-[var(--landing-blue)]"
                placeholder={newsletterData.placeholder}
                autoComplete="email"
                {...form.register("email")}
              />
              {form.formState.errors.email ? (
                <p className="text-[0.82rem] text-[var(--color-error-500)]">
                  {newsletterData.invalidEmailMessage}
                </p>
              ) : null}
              <button
                type="submit"
                className={primaryButtonClass}
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? newsletterData.submittingLabel
                  : newsletterData.ctaLabel}
              </button>
              {statusMessage ? (
                <p
                  role="status"
                  className={
                    submitState === "success"
                      ? "text-[0.84rem] text-[var(--color-success-700)]"
                      : "text-[0.84rem] text-[var(--color-error-500)]"
                  }
                >
                  {statusMessage}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
