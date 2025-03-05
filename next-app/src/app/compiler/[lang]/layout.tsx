import React from 'react'
import { IconRefresh } from '@tabler/icons-react';

const getCompilerServerState = async () => {
    try {
        const req = await fetch(process.env.COMPILER_API + "/status");
        if (!req.ok) {
            throw new Error("Something went wrong.");
        }
        const res = await req.json();
        return res;
    } catch (error: any) {
        return { error: error.message }
    }
}

const layout = async ({ children }: { children: React.ReactNode }) => {
    const data = await getCompilerServerState();
    return (
        <>
            {children}
            {data.error && <div className='w-full h-fit px-4 py-2 fixed bottom-0 left-0 bg-amber-700 flex items-center justify-center'>
                <p className='flex gap-2 justify-center text-center'><IconRefresh />The server might be in sleep mode. Please refresh the page or try again later.</p>
            </div>}
        </>
    )
}

export default layout;