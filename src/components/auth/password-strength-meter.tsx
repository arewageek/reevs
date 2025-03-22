
const PasswordStrengthMeter = ({ strength }: { strength: number }) => {
    return (
        <div className='mt-2 flex w-full h-1 gap-1'>
            {strength > 0 && <div className='h-full rounded-full bg-red-500 w-full'></div>}
            {strength > 2 && <div className='h-full rounded-full bg-orange-500 w-full'></div>}
            {strength > 3 && <div className='h-full rounded-full bg-green-500 w-full'></div>}
            {strength > 4 && <div className='h-full rounded-full bg-green-500 w-full'></div>}
        </div>
    )
}

export default PasswordStrengthMeter