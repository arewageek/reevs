import AuthNavbar from '@/components/layout/auth-navbar'
import React from 'react'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full '>
            <AuthNavbar />
            {children}
        </div>
    )
}

export default UserLayout