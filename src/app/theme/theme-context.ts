import { createContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export type ThemeContextValue = {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggleMode: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const THEME_STORAGE_KEY = 'theme';

export function normalizeMode(value: unknown): ThemeMode | null {
    if (value === 'light' || value === 'dark') {
        return value;
    }

    return null;
}
