"use client"

import React from 'react'
import { Button } from '../ui/button'
import { handleSignout } from '@/modules/auth/action'

const SignoutButton = () => {
    return (
        <form action={handleSignout}>
            <Button className='hover:no-underline hover:text-white/70 py-6 bg-accent-100'>
                Log out
            </Button>
        </form>
    )
}

export default SignoutButton