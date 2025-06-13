import { useMemo } from 'react';
import { useLocation } from 'react-router';

export function useHash() {
    const location = useLocation();
    return useMemo(() => location.hash, [location]);
}
export function scrollToHash(hash: string, offset: number = 0) {
    const cleanedHash = hash?.replace('#', '');
    if (cleanedHash) {
        requestAnimationFrame(() => {
            const el = document.getElementById(cleanedHash);
            if (el) {
                const top = el.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: top - offset - 20, behavior: 'smooth' });
                // el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}
