"use client";
import React from 'react'
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { getServerState } from '@/app/actions';

const Warning = ({ message }: { message: string }) => {
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        const getState = async () => {
            try {
                const status = await getServerState();
                if (status.error) {
                    setShow(true);
                } else {
                    clearInterval(interval);
                    setShow(false);
                }
            } catch (error) {
                setShow(true);
            }
        };

        getState();
        interval = setInterval(getState, 10000);
        return () => clearInterval(interval);
    }, []);


    return show ? (
        <div className='fixed bottom-0 left-0 w-full h-fit flex justify-center px-5'>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: 'spring', stiffness: 150 }}
                className='relative rounded-lg sm:rounded-full text-center mb-4 p-4 sm:py-2 bg-amber-700 text-white w-fit flex gap-2'>
                <p>{message}</p>
                <button
                    onClick={() => setShow(false)}
                    className='absolute sm:relative right-0 top-0 p-1 sm:p-0'
                >
                    <X size={20} />
                </button>
            </motion.div>
        </div>
    ) : null;
}

export default Warning;