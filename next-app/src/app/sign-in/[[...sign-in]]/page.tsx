"use client"
import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

const SignInPage = () => {
  const { resolvedTheme } = useTheme();
  const options: any = {};
  if (resolvedTheme === 'dark') {
    options.baseTheme = dark;
    options.variables = {
      colorBackground: "#0f0f0f"
    }
  }
  return (
    <div className='flex items-center justify-center w-full mt-24 sm:mt-0 sm:h-screen'><SignIn appearance={options} /></div>
  )
}

export default SignInPage