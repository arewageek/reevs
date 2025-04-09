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

      /**
       * Plan: The token will be hashed and stored locally so it can be verified to ensure the user changing the password is same user who requested the reset.
       */
      const hashedToken = await bcrypt.hash(token, 10);

      const prevRequest = await prisma.verificationRequest.findFirst({
        where: { userId: user.id },
      });

      if (!prevRequest) {
        //   persist verification token
        await prisma.verificationRequest.create({
          data: {
            userId: user.id,
            token,
            identifier: "PASSWORD_RESET",
            expires: new Date(Date.now() + 15 * 60 * 1000),
          },
        });
      } else {
        await prisma.verificationRequest.update({
          where: { id: prevRequest.id },
          data: {
            token,
            expires: new Date(Date.now() + 15 * 60 * 1000),
          },
        });
      }

      return {
        status: "success",
        message: "Password reset token sent to your email",
        data: {
          token: hashedToken,
        },
      };
    } catch (error: any) {
      return { status: "failed", data: error.message };
    }
  }

  public async verifyToken(
    token: string,
    tokenHash: string
  ): Promise<TResponse> {
    try {
      const hashMatched = await bcrypt.compare(token, tokenHash);
      if (!hashMatched)
        return {
          status: "failed",
          message: "Device not authorized!",
        };

      const verification = await prisma.verificationRequest.findUnique({
        where: { token },
      });

      if (!verification) return { status: "failed", message: "Invalid token" };
      if (verification.expires <= new Date()) {
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
  }: {
    email: string;
    token: string;
    hashedToken: string;
    password: string;
  }): Promise<TResponse> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      return { status: "success", message: "Password reset successful" };
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
