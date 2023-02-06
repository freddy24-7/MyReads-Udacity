import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const useThrottle = (value, limit) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const [previousCall, setPreviousCall] = useState(Date.now());

    useEffect(() => {
        const currentTime = Date.now();
        if (currentTime - previousCall >= limit) {
            setThrottledValue(value);
            setPreviousCall(currentTime);
        }
    }, [value, limit, previousCall]);

    return throttledValue;
};

export { useDebounce, useThrottle };