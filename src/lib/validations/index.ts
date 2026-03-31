import type { ZodError } from "zod";
export * from "@/lib/validations/auth";
export * from "@/lib/validations/home";

export type ValidationFieldErrors = Record<string, string[]>;

export function toValidationFieldErrors(error: ZodError): ValidationFieldErrors {
  return error.issues.reduce<ValidationFieldErrors>((accumulator, issue) => {
    const field = issue.path.join(".") || "root";
    const existing = accumulator[field] ?? [];
    accumulator[field] = [...existing, issue.message];
    return accumulator;
  }, {});
}

