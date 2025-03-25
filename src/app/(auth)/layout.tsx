import Link from 'next/link'
import React, { ReactNode } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const AuthLayout = async ({ children }: { children: ReactNode }) => {
    return (
        <div className='w-screen h-screen flex bg-primary-100 p-5'>
            <div className='w-full h-full flex '>
                <div className='hidden md:flex w-full h-full lg:w-2/5 flex-col justify-between px-5 py-10 rounded-3xl bg-[url("/images/purple-login.jpg")] bg-no-repeat bg-cover bg-center'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-bold text-xl text-white font-montserrat'>
                            Reevs
                        </h2>

                        <Link href="/" className='flex items-center bg-white/20 px-5 py-2 rounded-full text-white/80 text-sm gap-x-2 hover:text-white hover:gap-x-3 transition hover:bg-white/30 cursor-pointer font-inter'>
                            <FaArrowLeft />
                            Back to home
                        </Link>
                    </div>
                    <div>
                        <h1 className='text-3xl text-medium text-white text-center font-montserrat'>
                            A smart way to connect...
                        </h1>
                        <div className='w-full flex gap-x-2 items-center justify-center'>
                            <div className='w-[20pt] border-b-4 border-white/20 h-2 mt-4'></div>
                            <div className='w-[28pt] border-b-[4pt] border-white/80 h-2 mt-4'></div>
                            <div className='w-[20pt] border-b-4 border-white/20 h-2 mt-4'></div>
                        </div>
                    </div>
                </div>

                <div className='w-full lg:w-3/5 flex items-center justify-center'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout