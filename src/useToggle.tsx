"use client"
import React, { useEffect, useState } from 'react'

const useToggle = (initial: any, toggle: any) => {
    const [state, setState] = useState(initial)

    toggle = () => {
        setState(!initial)
    }
}

export default useToggle