import RegisterForm from '@/components/form/register.form'
import Link from 'next/link'
import React from 'react'

const RegisterPage = () => {
    return (
        <div className='w-full p-5 mx-auto lg:w-3/5'>
            <div className='my-5'>
                <h2 className='text-3xl lg:text-5xl text-white font-bold font-poppins tracking-wide'>
                    Create a free account.
                </h2>
                <p className='text-gray-300 text-sm lg:text-lg mt-3 font-inter'>
                    Already have an account? <Link href="/signin" className='hover:underline text-purple-400'>Signin your account</Link>
                </p>
            </div>

            <div className='mt-10'>
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage