import LoginForm from '@/components/ui/form/login.form'
import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
    return (
        <div className='w-full p-5 mx-auto lg:w-3/5'>
            <div className='my-5'>
                <h2 className='text-3xl lg:text-6xl text-white font-bold'>
                    Login your account.
                </h2>
                <p className='text-gray-300 text-sm lg:text-lg mt-3'>
                    New here? <Link href="/register" className='underline text-gray-200'>Create an account</Link>
                </p>
            </div>

            <div className='mt-10'>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage