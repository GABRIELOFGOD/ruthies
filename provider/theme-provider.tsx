"use client";

import { useEffect } from "react";
import { useUserContext } from "./user-provider";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useUserContext();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return <>{children}</>;
}
