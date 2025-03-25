import { auth } from '@/auth'
import React from 'react'

const Page = async () => {
    const session = await auth()

    return (
        <div>
            <div>{session?.user.id}</div>
            <div>{session?.user.firstName}</div>
            <div>{session?.user.lastName}</div>
            <div>{session?.user.email}</div>
            <div>{session?.user.role}</div>

        </div>
    )
}

export default Page