"use client";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/types/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handlePasswordReset } from "@/modules/auth/action";
import { usePasswordResetStore } from "@/store/auth/usePasswordStore";
import { Input } from "@/components/ui/input";
import { evaluatePasswordStrength } from "@/utils/password-strength-evaluator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import useToggle from "@/hooks/useToggle";
import PasswordStrengthMeter from "@/components/auth/password-strength-meter";
import SubmitButton from "@/components/buttons/submit-button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ResetPasswordForm = () => {

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [showPassword, togglePassword] = useToggle(false)

  const { userId, resetStep } = usePasswordResetStore()

  const router = useRouter()

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  })

  const { isSubmitting } = form.formState

  const submitPassword = async () => {
    const reset = await handlePasswordReset({ userId, password: form.getValues('password'), confirmPassword: form.getValues('confirmPassword') })
    if (reset.status == "success") {
      setIsSubmitted(true)
      form.reset()
      resetStep()

      toast.success("You have successfully changed your password")
      router.push("/signin")
    }
    else {
      toast.error(reset.data.error || reset.message)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(submitPassword)}>
      <div className='flex flex-wrap mt-10 text-gray-50 gap-y-3'>
        <Form {...form}>
          <div className='w-full'>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex hover:border-purple-500 border-2 border-transparent rounded-lg bg-white/10 items-center'>
                      <Input {...field} onChange={(e) => {
                        field.onChange(e)
                        setPasswordStrength(() => evaluatePasswordStrength(e.target.value))
                      }} type={showPassword ? 'text' : 'password'} placeholder='Password' className='py-6 px-3 ring-0 focus-within:ring-0 border-transparent hover:border-0 focus:border-0 placeholder:text-gray-400' />
                      <Button onClick={() => togglePassword()} type='button' className='h-full rounded-l-none bg-transparent hover:bg-transparent shadow-none hover:text-purple-400'>
                        {showPassword ? <Eye /> : <EyeClosed />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PasswordStrengthMeter strength={passwordStrength} />
          </div>

          <div className='w-full'>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex hover:border-purple-500 border-2 border-transparent rounded-lg bg-white/10 items-center'>
                      <Input {...field} type={showPassword ? 'text' : 'password'} placeholder='Confirm Password' className='py-6 px-3 ring-0 focus-within:ring-0 border-transparent hover:border-0 focus:border-0 placeholder:text-gray-400' />
                      <Button onClick={() => togglePassword()} type='button' className='h-full rounded-l-none bg-transparent hover:bg-transparent shadow-none hover:text-purple-400'>
                        {showPassword ? <Eye /> : <EyeClosed />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4 w-full">
            <SubmitButton isSubmitSuccessful={isSubmitted} isSubmitting={isSubmitting} text="Set Password" />
          </div>

        </Form>
      </div>
    </form >
  );
};

export default ResetPasswordForm;
