import { prisma } from "@/lib/prisma";
import { TResponse } from "@/types/common";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";

class PasswordService {
  public async requestPasswordReset(email: string): Promise<TResponse> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return { status: "failed", message: "Email does not exist" };

      // generate password reset token
      const token = nanoid(6);

      const request = await prisma.verificationRequest.findFirst({
        where: { userId: user.id },
      });
      console.log({ request });

      //   //   persist verification token
      await prisma.verificationRequest.create({
        data: {
          userId: user.id,
          token,
          identifier: "PASSWORD_RESET",
          expires: new Date(Date.now() + 15 * 60 * 1000),
        },
      });

      return {
        status: "success",
        message: "Password reset token sent to your email",
      };
    } catch (error: any) {
      return { status: "failed", data: error.message };
    }
  }

  public async verify(token: string): Promise<TResponse> {
    try {
      const verification = await prisma.verificationRequest.findUnique({
        where: { token },
      });
      if (!verification) return { status: "failed", message: "Invalid token" };
      if (verification.expires > new Date()) {
        return { status: "failed", message: "Token has expired" };
      }

      return { status: "success", message: "Verification successful" };
    } catch (error: any) {
      return {
        status: "failed",
        data: error.message,
      };
    }
  }

  public async resetPassword({
    password,
    email,
    token,
  }: {
    email: string;
    token: string;
    password: string;
  }): Promise<TResponse> {
    try {
      const tokenVerification = this.verify(token);
      if ((await tokenVerification).status == "success") {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await prisma.user.update({
          where: { email },
          data: { password: hashedPassword },
        });

        return { status: "success", message: "Password reset successful" };
      }

      return { status: "failed", message: (await tokenVerification).message };
    } catch (error: any) {
      return {
        status: "failed",
        data: error.message,
      };
    }
  }
}

const passwordService = new PasswordService();
export default passwordService;
