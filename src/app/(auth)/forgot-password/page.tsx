import ForgotPasswordForm from '@/components/form/forgot-password.form'
import Link from 'next/link'
import React from 'react'

const ForgotPasswordPage = () => {
    return (
        <div className='w-full p-5 mx-auto lg:w-3/5'>
            <div className='my-5'>
                <h2 className='text-3xl lg:text-5xl text-white font-bold font-poppins tracking-wide'>
                    Let's help you recover your password
                </h2>
                <p className='text-gray-300 text-sm lg:text-lg mt-3'>
                    New here? <Link href="/register" className='hover:underline text-purple-400'>Create an account</Link>
                </p>
            </div>

            <div className='mt-10'>
                <ForgotPasswordForm />
            </div>
        </div>
    )
}

export default ForgotPasswordPage