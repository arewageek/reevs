import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const GuestNavbar = () => {
    return (
        <div className='w-full p-4'>
            <div className='w-full rounded-3xl text-black bg-white shadow flex items-center justify-between p-4'>
                <div className='font-bold text-xl font-montserrat'>
                    Reevs
                </div>

                <div className='flex items-center gap-2'>
                    <Button asChild variant="link" className='hover:no-underline hover:text-black/70 font-bold'>
                        <Link href="/login">
                            Signin
                        </Link>
                    </Button>
                    <Button asChild className='hover:no-underline hover:text-white/70 py-6 bg-accent-100'>
                        <Link href="/register" className='rounded-xl'>
                            Create an account
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default GuestNavbar