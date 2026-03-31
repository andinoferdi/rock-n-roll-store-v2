import type { Metadata } from "next";
import AuthView from "@/components/auth/auth-view";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create a Rock N Roll Store account to save your wishlist, checkout faster, and track your orders.",
};

export default function RegisterPage() {
  return <AuthView defaultTab="register" />;
}
