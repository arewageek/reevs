"use client"

import React from 'react'
import { Button } from '../ui/button'
import { FaGoogle } from 'react-icons/fa'
import { handleGoogleSignin } from '@/modules/auth/action'

const GoogleSigninButton = () => {
    return (
        <form
            action={handleGoogleSignin}
            className='w-full'
        >
            <Button type="button" className='w-full py-6 lg:py-8 bg-transparent border-[1.5px] border-gray-200/70 hover:bg-transparent hover:text-purple-500 hover:border-purple-500'>
                <FaGoogle /> Google
            </Button>
        </form>
    )
}

export default GoogleSigninButton