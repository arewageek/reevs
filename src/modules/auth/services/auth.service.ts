import { prisma } from "@/lib/prisma";
import { TRegisterWithCredentialsProps, TResponse } from "@/types/common";
import { signIn } from "@/auth";
import { registrationSchemaServer } from "@/types/form-schema";
import bcrypt from "bcryptjs";

class AuthService {
  public async register({
    firstName,
    lastName,
    email,
    password,
    role,
  }: TRegisterWithCredentialsProps): Promise<TResponse> {
    try {
      const validation = registrationSchemaServer.safeParse({
        firstName,
        lastName,
        email,
        password,
      });

      console.log({ error: validation.error });
      if (!validation.success) {
        return {
          status: "failed",
          message: validation.error.errors[0].message, // Return first error
        };
      }

      const userExist = await prisma.user.findFirst({ where: { email } });
      if (userExist)
        return {
          status: "failed",
          message: "User already exist",
        };

      const userRole = await prisma.role.findUnique({
        where: { name: "user" },
      });
      const adminRole = await prisma.role.findUnique({
        where: { name: "admin" },
      });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          roleId: (role == "admin" ? adminRole : userRole)?.id!,
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

  public async login(email: string, password: string): Promise<TResponse> {
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
