"use client"

import { Input } from '../ui/input'
import { Eye, EyeClosed } from 'lucide-react'
import { Button } from '../ui/button'
import { FaGoogle, FaApple } from 'react-icons/fa'
import useToggle from '@/hooks/useToggle'

const LoginForm = () => {

    const [showPassword, togglePassword] = useToggle(false)

    return (
        <form method="post" className='flex flex-wrap mt-10 text-gray-50 gap-y-8'>
            <div className='w-full'>
                <Input type="email" placeholder='Email' name="email" className='py-6 px-3 hover:border-purple-500 border-2 border-transparent ring-0 focus-within:ring-0 bg-white/10' />
            </div>

            <div className='w-full'>
                <div className='flex hover:border-purple-500 border-2 border-transparent rounded-lg bg-white/10 items-center'>
                    <Input type={showPassword ? 'text' : 'password'} placeholder='Password' name="first_name" className='py-6 px-3 ring-0 focus-within:ring-0 border-transparent hover:border-0 focus:border-0' />
                    <Button onClick={() => togglePassword()} type='button' className='h-full rounded-l-none bg-transparent hover:bg-transparent shadow-none hover:text-purple-400'>
                        {showPassword ? <Eye /> : <EyeClosed />}
                    </Button>
                </div>
            </div>

            <div className='mt-4 w-full'>
                <Button className='bg-accent-100 hover:bg-accent-100/60 transition w-full py-7 px-3 rounded-lg'>
                    Login
                </Button>
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

        </form>
    )
}

export default LoginForm