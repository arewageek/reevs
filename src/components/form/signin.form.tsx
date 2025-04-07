"use client"

import { Input } from '../ui/input'
import { Eye, EyeClosed } from 'lucide-react'
import { Button } from '../ui/button'
import { FaApple } from 'react-icons/fa'
import useToggle from '@/hooks/useToggle'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import SubmitButton from '../buttons/submit-button'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { handleCredentialsSignin } from '@/modules/auth/action'
import { authRedirect } from '@/modules/auth/utils'
import { loginSchema } from '@/types/form-schema'
import GoogleSigninButton from '../auth/google-signin-button'

const SigninForm = () => {

    const [isSuccessful, seIsSuccessful] = useState(false)

    const [showPassword, togglePassword] = useToggle(false)

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        const signin = await handleCredentialsSignin(values.email, values.password)

        if (signin.status == 'success') {
            toast.success("Login was successful, please wait while we redirect you")
            seIsSuccessful(true)
            await authRedirect();  // redirect user to dashboard after signin
            return;
        }

        toast.error(signin.message || signin.data)
        seIsSuccessful(false)
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
                                    <Input {...field} type="email" placeholder='Email Address' name="email" className='py-6 px-3 hover:border-purple-500 border-2 border-transparent ring-0 focus-within:ring-0 bg-white/10 placeholder:text-gray-400' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='w-full'>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }: any) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex hover:border-purple-500 border-2 border-transparent rounded-lg bg-white/10 items-center'>
                                        <Input {...field} onChange={(e) => {
                                            field.onChange(e)
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
                </div>

                <div className='mt-4 w-full'>
                    <SubmitButton isSubmitSuccessful={isSuccessful} isSubmitting={isSubmitting} text="Login" />
                </div>
            </Form>
        </form>
    )
}

export default SigninForm