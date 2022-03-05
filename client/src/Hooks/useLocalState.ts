import { useEffect, useState } from "react";

export default function useLocalState(key: string, initial: any) {
    const [value, setValue] = useState(() => {
        if (typeof window !== undefined && window.localStorage) {
            const saved = window.localStorage.getItem(key);
            if (saved) {
                // check for expiration
                const savedObj = JSON.parse(saved);
                if (savedObj.expiration > Date.now()) {
                    // not expired yet
                    return savedObj.value;
                }
            }
        }
        return initial;
    });

    useEffect(() => {
        if (window.localStorage) {
            // set expiration of 1 minute
            const item = {
                value: value,
                expiration: Date.now() + 1000 * 60,
            }
            window.localStorage.setItem(key, JSON.stringify(item));
        }
    }, [value]);

    return [value, setValue];
}