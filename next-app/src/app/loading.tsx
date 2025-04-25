import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loading...",
  description: "Please wait until the page loads."
}
const Loading = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center overflow-hidden'>
      <div className='size-20 dark:bg-neutral-700 bg-neutral-500 flex items-center justify-center rounded-md animate-rotation-back'>
        <div className='size-20 rotate-45 dark:bg-neutral-800 bg-neutral-300 flex items-center justify-center rounded-md'>
          <div className='size-12 rounded-full dark:bg-black bg-white' />
        </div>
      </div>
    </div>
  )
}

export default Loading;