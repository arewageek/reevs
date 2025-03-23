"use server";

import { IRegisterWithCredentialsProps, IResponse } from "@/interface";
import authService from "./services/auth.service";

export async function handleUserRegistration(
  props: IRegisterWithCredentialsProps
): Promise<IResponse> {
  return await authService.register(props);
}

export async function handleCredentialsSignin(
  email: string,
  password: string
): Promise<IResponse> {
  return await authService.login(email, password);
}
