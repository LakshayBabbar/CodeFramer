'use client';

import Link from 'next/link';
import { getLocalStorage, setLocalStorage } from '@/lib/storageHelper';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { AnimatePresence, motion } from 'motion/react';
import CookieCustomizeModal from '../Modals/CookieCustomizeModal';

export default function CookieBanner() {
    const [cookieConsent, setCookieConsent] = useState<'all' | 'analytics' | 'necessary' | null>(null);
    const [showCustomize, setShowCustomize] = useState(false);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const storedConsent = getLocalStorage('cookie-consent', null);
        setCookieConsent(storedConsent);
    }, []);

    useEffect(() => {
        if (cookieConsent !== null) {
            let consentUpdate: any = { analytics_storage: 'denied', ad_storage: 'denied' };

            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                if (cookieConsent === 'all') {
                    consentUpdate = { analytics_storage: 'granted', ad_storage: 'granted' };
                } else if (cookieConsent === 'analytics') {
                    consentUpdate = { analytics_storage: 'granted', ad_storage: 'denied' };
                } else if (cookieConsent === 'necessary') {
                    consentUpdate = { analytics_storage: 'denied', ad_storage: 'denied' };
                }

                window.gtag('consent', 'update', consentUpdate);
            }

            setLocalStorage('cookie-consent', cookieConsent);
        }
    }, [cookieConsent]);


    useEffect(() => {
        const timmer = setTimeout(() => {
            setShowBanner(true);
        }, 8000);
        return () => {
            clearTimeout(timmer);
        };
    }, [])


    const handleSaveCustomize = (analytics: boolean, ads: boolean) => {
        if (analytics && ads) {
            setCookieConsent('all');
        } else if (analytics && !ads) {
            setCookieConsent('analytics');
        } else {
            setCookieConsent('necessary');
        }
        setShowCustomize(false);
    };

    return (
        <>
            <AnimatePresence>
                {cookieConsent === null && !showCustomize && showBanner ? (
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
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
                            <Button onClick={() => setShowCustomize(true)} variant="outline" size="sm" aria-label="Customize cookie settings">
                                Customize
                            </Button>
                            <Button onClick={() => setCookieConsent('analytics')} variant="secondary" size="sm" aria-label="Accept analytics only">
                                Accept Analytics Only
                            </Button>
                            <Button onClick={() => setCookieConsent('all')} size="sm" aria-label="Accept all cookies">
                                Accept All
                            </Button>
                        </div>
                    </motion.div>
                ) : showCustomize && (
                    <CookieCustomizeModal
                        onSave={handleSaveCustomize}
                        onClose={() => setShowCustomize(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
