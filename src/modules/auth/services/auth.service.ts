import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { IRegisterWithCredentialsProps, IResponse } from "@/interface";
import { signIn } from "@/auth";

class AuthService {
  public async register({
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
          password,
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

  public async login(email: string, password: string): Promise<IResponse> {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      return {
        status: "success",
        message: "Login successful",
      };
    } catch (error: any) {
      return {
        status: "error",
        data: error.message,
      };
    }
  }
}

const authService = new AuthService();
export default authService;
