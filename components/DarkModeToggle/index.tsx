'use client';

import { useState, useEffectEvent, useEffect } from 'react';
import * as Switch from '@radix-ui/react-switch';

function DarkMode({ label }: {label: string}) {
    const [isDarkMode, setDarkMode] = useState(false);
    
    const changeDarkMode = (value: boolean) => {
        if(value) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        setDarkMode(value);
    };

    const initialDarkMode = useEffectEvent(() => {
        changeDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    })

    useEffect(() => {
       initialDarkMode();
    }, []);

    
    return (
        <div 
            className="flex items-center justify-center text-center md:whitespace-nowrap"
            data-checked={isDarkMode}
        >
            <label className="mr-2 cursor-pointer select-none text-sm uppercase" htmlFor="dark-mode">
                {label}
            </label>
            <Switch.Root
                id="dark-mode"
                className="group relative h-5 w-9 rounded-full border border-foreground bg-background p-0.5 data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary-dark"
                onCheckedChange={changeDarkMode}
                checked={isDarkMode}
            >
                <Switch.Thumb
                    className="relative block aspect-square h-full w-auto translate-x-0 rounded-full bg-foreground transition will-change-transform group-data-[state=checked]:translate-x-4"
                />
            </Switch.Root>
        </div>
    )
}

export default DarkMode;