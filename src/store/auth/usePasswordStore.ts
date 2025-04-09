import { PasswordResetSteps } from "@/types/enums";
import { create } from "zustand";

interface IPasswordResetStore {
  userId: string;
  setUserId: (userId: string) => void;

  step: PasswordResetSteps;
  setStep: (step: PasswordResetSteps) => void;
  resetStep: () => void;
}

export const usePasswordResetStore = create<IPasswordResetStore>((set) => ({
  userId: "",
  setUserId: (userId: string) => set({ userId }),

  step: PasswordResetSteps.request_email,
  setStep: (step: PasswordResetSteps) => set({ step }),
  resetStep: () =>
    set({
      step: PasswordResetSteps.request_email,
    }),
}));
