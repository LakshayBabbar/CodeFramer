'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'motion/react';

interface CookieCustomizeModalProps {
    onSave: (analytics: boolean, ads: boolean) => void;
    onClose: () => void;
}

export default function CookieCustomizeModal({ onSave, onClose }: CookieCustomizeModalProps) {
    const [analyticsCookies, setAnalyticsCookies] = useState(true);
    const [adsCookies, setAdsCookies] = useState(true);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]"
        >
            <div className="bg-card p-6 rounded-2xl w-[90%] max-w-md border shadow-xl relative space-y-6">
                <h2 className="text-xl font-semibold text-center">Customize Cookie Settings</h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span>Necessary Cookies</span>
                        <span className="text-xs text-muted-foreground">Always Enabled</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="analytics" className="text-sm">
                            Analytics Cookies
                        </label>
                        <Checkbox
                            id="analytics"
                            checked={analyticsCookies}
                            onCheckedChange={(checked) => setAnalyticsCookies(!!checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="ads" className="text-sm">
                            Advertising Cookies
                        </label>
                        <Checkbox
                            id="ads"
                            checked={adsCookies}
                            onCheckedChange={(checked) => setAdsCookies(!!checked)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => onSave(analyticsCookies, adsCookies)}>
                        Save Preferences
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
