import React from 'react'
import Sidebar from '@/components/Sidebar/Sidebar';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-col sm:flex-row overflow-hidden'>
            <Sidebar />
            <div className='px-4 w-full'>{children}</div>
        </div>
    )
}

export default layout