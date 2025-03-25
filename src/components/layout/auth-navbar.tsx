import React from 'react'
import SignoutButton from '../auth/signout-button'

const AuthNavbar = () => {
    return (
        <div className='w-full px-4 py-3 flex items-center justify-center'>
            <div className='w-full rounded-3xl text-black shadow flex items-center justify-between px-6 py-4 bg-white'>
                <div className='text-xl font-bold font-montserrat'>
                    Reevs
                </div>

                <div className='flex items-center justify-end'>
                    <SignoutButton />
                </div>
            </div>
        </div>
    )
}

export default AuthNavbar