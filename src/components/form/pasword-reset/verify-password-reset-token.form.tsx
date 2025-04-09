"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "react-toastify"
import Cookie from "js-cookie"
import { handlePasswordTokenVerification } from "@/modules/auth/action"
import { usePasswordResetStore } from "@/store/auth/usePasswordStore"
import { PasswordResetSteps } from "@/types/enums"
import { useEffect, useState } from "react"

const VerifyPasswordResetForm = () => {
  const [attempts, setAttempts] = useState(4)

  const { setStep, resetStep, setUserId } = usePasswordResetStore()

  const handleSubmit = async (input: string) => {
    const tokenHash = Cookie.get('password-reset-token')
    const verify = await handlePasswordTokenVerification(input, tokenHash || "")
    if (verify.status == "success") {
      toast.success("Token verified successfully")
      Cookie.remove('password-reset-token')

      setUserId(verify.data.userId)
      setStep(PasswordResetSteps.reset_password)
    }
    else {
      toast.error(`${verify.message || verify.data} ${attempts > 1 ? `You have ${attempts - 1} attempt(s) left` : ""}`)
      setAttempts(prev => prev - 1)
    }
  }

  useEffect(() => {
    attempts <= 0 && resetStep()
  }, [attempts])

  return (
    <form action="">
      <InputOTP maxLength={6} className="w-full" onComplete={input => handleSubmit(input)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} className="w-[30pt] h-[30pt] lg:w-[50pt] lg:h-[50pt] border-2 mx-1" />
          <InputOTPSlot index={1} className="w-[30pt] h-[30pt] lg:w-[50pt] lg:h-[50pt] border-2 mx-1" />
          <InputOTPSlot index={2} className="w-[30pt] h-[30pt] lg:w-[50pt] lg:h-[50pt] border-2 mx-1" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} className="w-[30pt] h-[30pt] lg:w-[50pt] lg:h-[50pt] border-2 mx-1" />
          <InputOTPSlot index={4} className="w-[30pt] h-[30pt] lg:w-[50pt] lg:h-[50pt] border-2 mx-1" />
          <InputOTPSlot index={5} className="w-[30pt] h-[30pt] lg:w-[50pt] lg:h-[50pt] border-2 mx-1" />
        </InputOTPGroup>
      </InputOTP>
    </form>
  )
}

export default VerifyPasswordResetForm