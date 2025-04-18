"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const authRedirect = async () => {
  const session = await auth();

  if (session?.user) {
    redirect(`/${session.user.role}`);
  }
};
