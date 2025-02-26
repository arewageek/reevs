import RegisterForm from '@/components/ui/form/register.form'
import Link from 'next/link'
import React from 'react'

const RegisterPage = () => {
    return (
        <div className='w-full p-5 mx-auto lg:w-3/5'>
            <div className='my-5'>
                <h2 className='text-3xl lg:text-6xl text-white font-bold'>
                    Create a free account.
                </h2>
                <p className='text-gray-300 text-sm lg:text-lg mt-3'>
                    Already have an account? <Link href="/login" className='underline text-gray-200'>Login</Link>
                </p>
            </div>

            <div className='mt-10'>
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage