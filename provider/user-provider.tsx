"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface UserContextProps {
  currency: string;
  changeCurrency: (currency: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}
const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<string>("NGN");
  const [theme, setThemeState] = useState("dark");

  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency");
    if (storedCurrency) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrency(storedCurrency);
    }

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(storedTheme);
    }
  }, []);

  const changeCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    // Update the HTML element's class
    document.documentElement.className = newTheme;
  };

  const contextValue: UserContextProps = {
    currency,
    changeCurrency,
    theme,
    setTheme,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
