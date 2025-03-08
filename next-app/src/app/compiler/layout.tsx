import Warning from '@/components/ui/warning'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <Warning message='Server might be in sleep mode. If execution is slow, please refresh the page.' />
        </>
    )
}

export default layout