import React from 'react'
import GoogleSigninButton from './google-signin-button'

const OauthSignin = () => {
    return (
        <div className='flex flex-col gap-y-8 mt-8 w-full'>
            <div className='w-full flex items-center justify-center text-sm'>
                <div className='text-gray-300/80'>
                    Or login with
                </div>
            </div>

            <div className='flex items-center gap-x-4 w-full'>
                <GoogleSigninButton />
            </div>
        </div>
    )
}

export default OauthSignin