"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { newSupportRequest } from '../actions'
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer/Footer';
import { motion } from 'framer-motion';

const Contact = () => {
  const [data, setData] = React.useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await newSupportRequest(data);
    toast({
      title: res.message || res.error,
      description: new Date().toString(),
    })
    setLoading(false);
    setData({ name: "", email: "", message: "" });
  };

  const valHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <main className='w-full h-screen place-items-center sm:place-content-center relative'>
        <motion.form
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handelSubmit} className='mt-32 sm:mt-0 w-11/12 sm:w-[30rem] h-fit flex flex-col gap-3 sm:p-8 rounded-xl'>
          <div className='space-y-1'>
            <h1 className='text-4xl font-bold my-2'>Contact Us</h1>
            <p>Get in touch with the CodeFramer for support or inquiries.</p>
          </div>
          <Input name="name" value={data.name} onChange={valHandler} placeholder='Fullname' className='h-12 text-md' required />
          <Input name="email" value={data.email} onChange={valHandler} type='email' placeholder='Email' className='h-12 text-md' required />
          <Textarea name="message" value={data.message} onChange={valHandler} placeholder='Message' className='min-h-32 max-h-60 text-md' required />
          <Button size="lg" className='text-md' type='submit' disabled={loading}>Submit</Button>
        </motion.form>
        <div className='fixed -z-10 w-2/6 sm:opacity-75 h-32 -rotate-12 -bottom-10 -right-10 bg-gradient-to-br from-blue-700 to-purple-700 blur-[150px]' />
        <div className='fixed -z-10 w-2/6 h-32 sm:opacity-75 -rotate-12 -top-10 -left-10 bg-gradient-to-br from-blue-700 to-purple-700 blur-[150px]' />
      </main>
      <Footer />
    </>
  )
}

export default Contact;