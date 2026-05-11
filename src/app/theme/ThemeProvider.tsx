import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    normalizeMode,
    THEME_STORAGE_KEY,
    ThemeContext,
    type ThemeContextValue,
    type ThemeMode,
} from './theme-context';

export function ThemeProvider({
    children,
    defaultMode = 'light',
}: {
    children: React.ReactNode;
    defaultMode?: ThemeMode;
}) {
    const [mode, setModeState] = useState<ThemeMode>(() => {
        const saved = normalizeMode(localStorage.getItem(THEME_STORAGE_KEY));

        return saved ?? defaultMode;
    });

    const setMode = useCallback((nextMode: ThemeMode) => {
        setModeState(nextMode);
    }, []);

    const toggleMode = useCallback(() => {
        setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, []);

    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, mode);

        document.documentElement.classList.toggle('dark', mode === 'dark');
    }, [mode]);

    const value = useMemo<ThemeContextValue>(
        () => ({
            mode,
            setMode,
            toggleMode,
        }),
        [mode, setMode, toggleMode],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
