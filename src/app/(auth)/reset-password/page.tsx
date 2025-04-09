"use client"

import ForgotPasswordForm from '@/components/form/pasword-reset/forgot-password.form'
import ResetPasswordForm from '@/components/form/pasword-reset/reset-password.form'
import VerifyPasswordResetForm from '@/components/form/pasword-reset/verify-password-reset-token.form'
import { usePasswordResetStore } from '@/store/auth/usePasswordStore'
import { PasswordResetSteps } from '@/types/enums'
import Link from 'next/link'
import React from 'react'

const ResetPasswordPage = () => {

    const { step } = usePasswordResetStore()

    const renderStep = (step: PasswordResetSteps) => {
        switch (step) {
            case PasswordResetSteps.request_email:
                return <ForgotPasswordForm />
            case PasswordResetSteps.verify_email:
                return <VerifyPasswordResetForm />
            case PasswordResetSteps.reset_password:
                return <ResetPasswordForm />
            default:
                return <ForgotPasswordForm />
        }
    }

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
                {renderStep(step)}
            </div>
        </div>
    )
}

export default ResetPasswordPage