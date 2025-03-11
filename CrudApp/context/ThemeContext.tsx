import React, { createContext, useState, ReactNode  } from 'react';
import { Appearance } from 'react-native';
import { Colors } from '@/constants/Color';


type ThemeContextType = {
    colorScheme?: string | null;
    setColorScheme: React.Dispatch<React.SetStateAction<'light'| 'dark' | null | undefined>>;
    theme: typeof Colors.light | typeof Colors.dark;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);


type WrapperProp = {
    children: React.ReactNode;
}

export const ThemeProvider = ( { children } : WrapperProp ) => {

    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return (
        <ThemeContext.Provider value = {{ colorScheme, setColorScheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );

}


