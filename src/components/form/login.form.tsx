"use client"

import { Input } from '../ui/input'
import { Eye, EyeClosed } from 'lucide-react'
import { Button } from '../ui/button'
import { FaGoogle, FaApple } from 'react-icons/fa'
import useToggle from '@/hooks/useToggle'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import SubmitButton from '../buttons/submit-button'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { handleCredentialsSignin } from '@/modules/auth/action'

const formSchema = z.object({
    email: z.string().email().min(5).max(30),
    password: z.string().min(8).max(30),
})

const LoginForm = () => {

    const [isSuccessful, seIsSuccessful] = useState(false)

    const [showPassword, togglePassword] = useToggle(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const { isSubmitting, isSubmitSuccessful } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const signin = await handleCredentialsSignin(values.email, values.password)

        if (signin.status == 'success') {
            toast.success("Login was successful, please wait while we redirect you")
            seIsSuccessful(true)
            router.push('/user')
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
                        render={({ field }) => (
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
                        render={({ field }) => (
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

                <div className='w-full flex items-center justify-center text-sm'>
                    <div className='text-gray-300/80'>
                        Or login with
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
            </Form>
        </form>
    )
}

export default LoginForm