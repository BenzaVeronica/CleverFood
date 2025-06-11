import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';

export function useHash() {
    const location = useLocation();
    return useMemo(() => location.hash, [location]);
}

export function useScrollToHash(hash: string) {
    useEffect(() => {
        const cleanedHash = hash?.replace('#', '');
        if (cleanedHash) {
            requestAnimationFrame(() => {
                const el = document.getElementById(cleanedHash);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    }, [hash]);
}
