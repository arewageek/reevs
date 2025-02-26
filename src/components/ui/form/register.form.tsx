"use client"

import { Input } from '../input'
import { Eye, EyeClosed } from 'lucide-react'
import { Button } from '../button'
import { Checkbox } from '../checkbox'
import Link from 'next/link'
import { } from 'lucide-react'
import { FaGoogle, FaApple } from 'react-icons/fa'
import useToggle from '@/hooks/useToggle'

const RegisterForm = () => {

    const [showPassword, togglePassword] = useToggle(false)

    return (
        <form method="post" className='flex flex-wrap mt-10 text-gray-50 gap-y-8'>
            <div className='w-full lg:w-1/2 lg:pr-4'>
                <Input type="text" placeholder='First Name' name="first_name" className='py-6 px-3 hover:border-purple-500 border-2 border-transparent ring-0 focus-within:ring-0 bg-white/10' />
            </div>

            <div className='w-full lg:w-1/2 lg:pl-4'>
                <Input type="text" placeholder='Last Name' name="last_name" className='py-6 px-3 hover:border-purple-500 border-2 border-transparent ring-0 focus-within:ring-0 bg-white/10' />
            </div>

            <div className='w-full'>
                <Input type="email" placeholder='Email' name="email" className='py-6 px-3 hover:border-purple-500 border-2 border-transparent ring-0 focus-within:ring-0 bg-white/10' />
            </div>

            <div className='w-full lg:w-1/2 lg:pr-4'>
                <div className='flex hover:border-purple-500 border-2 border-transparent rounded-lg bg-white/10 items-center'>
                    <Input type={showPassword ? 'text' : 'password'} placeholder='Password' name="first_name" className='py-6 px-3 ring-0 focus-within:ring-0 border-transparent hover:border-0 focus:border-0' />
                    <Button onClick={() => togglePassword()} type='button' className='h-full rounded-l-none bg-transparent hover:bg-transparent shadow-none hover:text-purple-400'>
                        {showPassword ? <Eye /> : <EyeClosed />}
                    </Button>
                </div>
            </div>

            <div className='w-full lg:w-1/2 lg:pl-4'>
                <div className='flex hover:border-purple-500 border-2 border-transparent rounded-lg bg-white/10 items-center'>
                    <Input type={showPassword ? 'text' : 'password'} placeholder='Confirm Password' name="first_name" className='py-6 px-3 ring-0 focus-within:ring-0 border-transparent hover:border-0 focus:border-0' />
                    <Button onClick={() => togglePassword()} type='button' className='h-full rounded-l-none bg-transparent hover:bg-transparent shadow-none hover:text-purple-400'>
                        {showPassword ? <Eye /> : <EyeClosed />}
                    </Button>
                </div>
            </div>

            <div className='w-full'>
                <label htmlFor="terms" className='flex items-center gap-x-2'>
                    <Checkbox name="terms" id="terms" className='bg-white text-black h-[20pt] w-[20pt] rounded-lg' /> I agree to the <Link className='text-purple-400 underline' href="#">Terms & Conditions</Link>
                </label>
            </div>

            <div className='mt-4 w-full'>
                <Button className='bg-accent-100 hover:bg-accent-100/60 transition w-full py-7 px-3 rounded-lg'>
                    Create account
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

        </form>
    )
}

export default RegisterForm