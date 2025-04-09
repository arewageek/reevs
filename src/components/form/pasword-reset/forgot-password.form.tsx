"use client"

import { handleRequestPasswordReset } from '@/modules/auth/action'
import { forgotPasswordSchema } from '@/types/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import SubmitButton from '../../buttons/submit-button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../ui/form'
import { Input } from '../../ui/input'
import { toast } from 'react-toastify'
import { usePasswordResetStore } from '@/store/auth/usePasswordStore'
import { PasswordResetSteps } from '@/types/enums'
import Cookie from 'js-cookie'

const ForgotPasswordForm = () => {

    const [isSuccessful, setIsSuccessful] = useState(false)

    const { resetStep, setStep } = usePasswordResetStore()

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ""
        }
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
        const reset = await handleRequestPasswordReset(values.email)
        if (reset.status == "success") {
            setIsSuccessful(true)
            toast.success("Your password reset link has been sent to your email")

            Cookie.set('password-reset-token', reset.data.token, { expires: 1 })
            setStep(PasswordResetSteps.verify_email)
        }
        else {
            toast.error(reset.message || reset.data)
            resetStep()
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} method="post" className='flex flex-wrap mt-10 text-gray-50 gap-y-8'>
            <Form {...form}>
                <div className='w-full'>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }: any) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex hover:border-purple-500 border-2 border-transparent rounded-lg bg-white/10 items-center'>
                                        <Input {...field} onChange={(e) => {
                                            field.onChange(e)
                                        }} type="email" placeholder='Enter your email address' className='py-6 px-3 ring-0 focus-within:ring-0 border-transparent hover:border-0 focus:border-0 placeholder:text-gray-400' />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='mt-4 w-full'>
                    <SubmitButton isSubmitSuccessful={isSuccessful} isSubmitting={isSubmitting} text="Request email" />
                </div>
            </Form>
        </form>
    )
}

export default ForgotPasswordForm