import GuestNavbar from '@/components/layout/navbar/guest-navbar'
import React from 'react'

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <GuestNavbar />
            {children}
        </div>
    )
}

export default GuestLayout