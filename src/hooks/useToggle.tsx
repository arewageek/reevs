"use client"
import React, { useEffect, useState } from 'react'

const useToggle = (initial: any) => {
    const [state, setState] = useState(initial);

    const toggle = () => {
        setState(!state)
    }

    return [state, toggle];
}

export default useToggle