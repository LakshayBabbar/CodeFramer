const Loading = () => {
  return (
    <div className='h-screen w-full place-items-center place-content-center'>
      <div className='size-20 dark:bg-neutral-700 bg-neutral-500 place-content-center place-items-center rounded-md animate-rotationBack'>
        <div className='size-20 rotate-45 dark:bg-neutral-800 bg-neutral-300 place-content-center place-items-center rounded-md'>
          <div className='size-12 rounded-full dark:bg-black bg-white' />
        </div>
      </div>
    </div>
  )
}

export default Loading;