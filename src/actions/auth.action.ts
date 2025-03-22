"use server";

import { IRegisterWithCredentialsProps, IResponse } from "@/interface";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function registerUsingCredentials({
  firstName,
  lastName,
  email,
  password,
}: IRegisterWithCredentialsProps): Promise<IResponse> {
  try {
    const userExist = await prisma.user.findFirst({ where: { email } });
    if (userExist)
      return {
        status: "failed",
        message: "User already exist",
      };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return {
      status: "success",
      message: "Your account has been successfully created",
    };
  } catch (error: any) {
    return {
      status: "error",
      data: error.message,
    };
  }
}
