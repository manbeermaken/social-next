"use client";

import { createContext, useState } from "react";

export const AppContext = createContext<any>(null);

export default function Providers({ 
  children, 
  initialUsername 
}: { 
  children: React.ReactNode;
  initialUsername: string | null;
}) {

  const [username, setUsername] = useState<string | null>(initialUsername);

  return (
    <AppContext.Provider value={{ username, setUsername }}>
      {children}
    </AppContext.Provider>
  );
}