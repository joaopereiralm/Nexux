import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext(null);

const STORAGE_KEY = 'nexux-theme';
const THEMES = ['dark', 'light'];

// O script em index.html já definiu data-theme antes da primeira pintura;
// aqui apenas lemos esse valor para iniciar o estado do React em sincronia.
function getInitialTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  return THEMES.includes(current) ? current : 'dark';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Armazenamento indisponível (modo privado, por exemplo): o tema vale só nesta sessão.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
