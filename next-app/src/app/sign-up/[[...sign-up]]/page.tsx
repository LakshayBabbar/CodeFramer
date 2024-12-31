"use client";
import { SignUp } from '@clerk/nextjs'
import { useTheme } from 'next-themes';
import { dark } from "@clerk/themes"

const SignUpPage = () => {
  const { resolvedTheme } = useTheme();
  const options: any = {};
  if (resolvedTheme === 'dark') {
    options.baseTheme = dark;
    options.variables = {
      colorBackground: "#0f0f0f"
    }
  }
  return (
    <div className='flex items-center justify-center w-full mt-24 sm:mt-0 sm:h-screen'><SignUp appearance={options} /></div>
  )
}

export default SignUpPage