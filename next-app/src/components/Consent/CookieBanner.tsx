'use client';

import Link from 'next/link';
import { getLocalStorage, setLocalStorage } from '@/lib/storageHelper';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { AnimatePresence, motion } from 'motion/react';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
    const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
    const [bannerVisible, setBannerVisible] = useState(false);

    useEffect(() => {
        const storedConsent = getLocalStorage('cookie_consent', null);
        setCookieConsent(storedConsent);
    }, []);

    useEffect(() => {
        if (cookieConsent !== null) {
            const consentStatus = cookieConsent ? 'granted' : 'denied';

            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                window.gtag('consent', 'update', {
                    analytics_storage: consentStatus,
                });
            }

            setLocalStorage('cookie_consent', cookieConsent);
        }
    }, [cookieConsent]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (cookieConsent === null) {
            timer = setTimeout(() => setBannerVisible(true), 10000);
        }
        return () => clearTimeout(timer);
    }, [cookieConsent]);

    const handleConsent = useCallback((value: boolean) => {
        setCookieConsent(value);
        setBannerVisible(false);
    }, []);

    return (
        <AnimatePresence>
            {bannerVisible ? (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    key="cookie-banner"
                    className="fixed bottom-4 left-0 right-0 mx-auto md:left-4 md:mx-0 max-w-96 sm:max-w-[30rem] p-4 flex flex-col gap-3 bg-card rounded-xl border drop-shadow-xl z-[999]"
                    role="dialog"
                    aria-live="polite"
                    aria-label="Cookie consent banner"
                >
                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo.webp"
                            width={50}
                            height={50}
                            alt="CodeFramer logo"
                            priority
                        />
                        <Link href="/info/cookies">
                            <p className="text-sm">
                                Help us make CodeFramer better! Accept cookies to improve features and performance.
                            </p>
                        </Link>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button onClick={() => handleConsent(false)} variant="outline" size="sm" aria-label="Decline cookies">
                            Decline
                        </Button>
                        <Button onClick={() => handleConsent(true)} size="sm" aria-label="Accept cookies">
                            Accept Cookies
                        </Button>
                    </div>
                </motion.div>
            ) : (
                <Button
                    variant="secondary"
                    key="customise-cookie-button"
                    aria-label="Customise cookie consent"
                    className="fixed z-[999] border left-4 bottom-4 rounded-full py-2 has-[>svg]:px-2"
                    onClick={() => setBannerVisible(true)}
                >
                    <Cookie className="size-full" />
                </Button>
            )}
        </AnimatePresence>
    );
}
