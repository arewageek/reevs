"use server";

import { TRegisterWithCredentialsProps, TResponse } from "@/types/common";
import authService from "./services/auth.service";
import { signIn, signOut } from "@/auth";
import passwordService from "./services/password.service";

export async function handleUserRegistration(
  props: TRegisterWithCredentialsProps
): Promise<TResponse> {
  return await authService.register(props);
}

export async function handleCredentialsSignin(
  email: string,
  password: string
): Promise<TResponse> {
  return await authService.login(email, password);
}

export async function handleSignout() {
  await signOut({ redirectTo: "/" });
}

export async function handleRequestPasswordReset(
  email: string
): Promise<TResponse> {
  return await passwordService.requestPasswordReset(email);
}

export async function handleGoogleSignin() {
  "use server";
  await signIn("google");
}

export async function handlePasswordTokenVerification(
  token: string,
  hashedToken: string
): Promise<TResponse> {
  return await passwordService.verifyToken(token, hashedToken);
}
