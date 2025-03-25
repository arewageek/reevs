"use server";

import { TRegisterWithCredentialsProps, TResponse } from "@/types/common";
import authService from "./services/auth.service";
import { signOut } from "@/auth";

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
