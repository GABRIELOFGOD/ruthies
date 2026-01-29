"use client";

import { User } from "@/types/user";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { DashboardData } from '../types/user';

interface DashboardContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  dashboardData: DashboardData;
  setDashboardData: Dispatch<SetStateAction<DashboardData>>;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    name: "Gabriel Ayodele",
    email: "gabriel.ayodele@google.com",
    avatar: "/images/ruthies_logo.jpg"
  });
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    products: 100,
    orders: 50,
    customers: 25,
    revenue: 10000
  });

  const contextValue: DashboardContextProps = {
    user, setUser, dashboardData, setDashboardData
  };
  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within a DashboardProvider");
  }
  return context;
};
