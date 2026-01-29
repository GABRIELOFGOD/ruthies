"use client";

import Header from "@/components/layouts/header";
import { useUserContext } from "@/provider/user-provider";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useUserContext();
  
  return (
    <div className={theme}>
      <Header />
      {children}
    </div>
  )
}
export default MainLayout;