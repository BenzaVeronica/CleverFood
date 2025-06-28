import { useEffect, useRef, useState } from 'react';

export function useElementHeight<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [height, setHeight] = useState<number>(250);

    useEffect(() => {
        if (!ref.current) return;

        const updateHeight = () => {
            if (ref.current) {
                setHeight(ref.current.offsetHeight);
            }
        };

        updateHeight();

        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(ref.current);

        return () => resizeObserver.disconnect();
    }, []);

    return { ref, height };
}
