import type { Metadata } from "next";
import AuthView from "@/components/auth/auth-view";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Rock N Roll Store account to continue shopping and check your orders.",
};

export default function LoginPage() {
  return <AuthView defaultTab="login" />;
}
