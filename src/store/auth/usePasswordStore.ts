import { PasswordResetSteps } from "@/types/enums";
import { create } from "zustand";

interface IPasswordResetStore {
  step: PasswordResetSteps;
  setStep: (step: PasswordResetSteps) => void;
  resetStep: () => void;
}

export const usePasswordResetStore = create<IPasswordResetStore>((set) => ({
  step: PasswordResetSteps.request_email,
  setStep: (step: PasswordResetSteps) => set({ step }),
  resetStep: () =>
    set({
      step: PasswordResetSteps.request_email,
    }),
}));
