"use client"

import { Input } from '../ui/input'
import { Eye, EyeClosed } from 'lucide-react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import Link from 'next/link'
import { } from 'lucide-react'
import { FaGoogle, FaApple } from 'react-icons/fa'
import useToggle from '@/hooks/useToggle'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { boolean, z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import LoadingButton from '../button-effects/loading-button'
import SuccessButton from '../button-effects/success-button'
import { evaluatePasswordStrength } from '@/utils/password-strength-evaluator'
import { useState } from 'react'
import PasswordStrengthMeter from '../auth/password-strength-meter'
import { registerUsingCredentials } from '@/actions/auth.action'
import { toast } from 'react-toastify'
import { redirect, useRouter } from 'next/navigation'

const formSchema = z.object({
    firstName: z.string().min(3).max(30),
    lastName: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8).max(30),
    confirmPassword: z.string().min(8).max(30),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

const RegisterForm = () => {

    const [passwordStrength, setPasswordStrength] = useState<number>(0)

    const [showPassword, togglePassword] = useToggle(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const { isSubmitSuccessful, isSubmitting } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await registerUsingCredentials(values)

        if (response.status === 'success') {
            toast.success(response.message)
            router, redirect("/login")
        }
        else if (response.status === 'failed') {
            toast.error(response.message)
        }
        else {
            toast.error(response.data)
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex flex-wrap mt-10 text-gray-50 gap-y-8'>
                    <div className='w-full lg:w-1/2 lg:pr-4'>

                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder='First Name' className='py-6 px-3 hover:border-purple-500 border-2 border-transparent ring-0 focus-within:ring-0 bg-white/10 placeholder:text-gray-400' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='w-full lg:w-1/2 lg:pl-4'>
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder='Last Name' name="last_name" className='py-6 px-3 hover:border-purple-500 border-2 border-transparent ring-0 focus-within:ring-0 bg-white/10 placeholder:text-gray-400' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='w-full'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder='Email' name="email" className='py-6 px-3 hover:border-purple-500 border-2 border-transparent ring-0 focus-within:ring-0 bg-white/10 placeholder:text-gray-400' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='w-full lg:w-1/2 lg:pr-4'>
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

                    <div className='w-full lg:w-1/2 lg:pl-4'>
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

                    <div className='w-full'>
                        <label htmlFor="terms" className='flex items-center gap-x-2'>
                            <Checkbox name="terms" id="terms" className='bg-white text-black h-[20pt] w-[20pt] rounded-lg' /> I agree to the <Link className='text-purple-400 underline' href="#">Terms & Conditions</Link>
                        </label>
                    </div>

                    <div className='mt-4 w-full'>
                        <Button disabled={passwordStrength < 3 || isSubmitSuccessful || isSubmitting} type="submit" className={`bg-accent-100 hover:bg-accent-100/60 transition w-full py-7 px-3 rounded-lg ${isSubmitting}`}>
                            {isSubmitting ? <LoadingButton /> : isSubmitSuccessful ? <SuccessButton /> : 'Create account'}
                        </Button>
                    </div>

                    <div className='w-full flex items-center justify-center text-sm'>
                        <div className='text-gray-300/80'>
                            Or register with
                        </div>
                    </div>

                    <div className='flex items-center gap-x-4 w-full'>
                        <Button className='w-1/2 py-4 lg:py-8 bg-transparent border-[1.5px] border-gray-200/70 hover:bg-transparent hover:text-purple-500 hover:border-purple-500'>
                            <FaGoogle /> Google
                        </Button>

                        <Button className='w-1/2 py-4 lg:py-8 bg-transparent border-[1.5px] border-gray-200/70 hover:bg-transparent hover:text-purple-500 hover:border-purple-500'>
                            <FaApple /> Apple
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default RegisterForm