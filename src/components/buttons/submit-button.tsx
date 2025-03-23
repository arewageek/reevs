import React from 'react'
import { Button } from '../ui/button'
import { FaCheckCircle } from 'react-icons/fa'

interface IProps {
    isSubmitting: boolean,
    isSubmitSuccessful: boolean,
    text: string
}

const SubmitButton = ({ isSubmitSuccessful, isSubmitting, text }: IProps) => {
    return (
        <Button disabled={isSubmitSuccessful || isSubmitting} className='bg-accent-100 hover:bg-accent-100/60 transition w-full py-7 px-3 rounded-lg'>
            {isSubmitting ?
                <div className='border-2 border-l-0 animate animate-spin h-5 w-5 rounded-full' /> :
                isSubmitSuccessful ?
                    <div className='text-white'>
                        <FaCheckCircle />
                    </div> :
                    text
            }
        </Button>
    )
}

export default SubmitButton