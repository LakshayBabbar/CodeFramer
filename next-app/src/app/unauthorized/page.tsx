import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '401 | Unauthorized',
  description: 'Unauthorized Access',
  robots: {
    index: false,
    follow: false
  }
}

const page = () => {
  return (
    <main className='place-items-center place-content-center h-screen w-full'>
      <div className='text-center text-xl flex items-center justify-center'>
        <span className='text-2xl'>401</span> <span className='text-5xl font-thin mx-4 mb-2 text-neutral-500'>|</span> Unauthorized Access
      </div>
    </main>
  )
}

export default page