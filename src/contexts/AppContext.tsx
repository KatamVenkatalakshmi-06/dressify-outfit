import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { SavedDesign, Measurements, FabricInfo } from "@/data/designs";

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AppState {
  isLoggedIn: boolean;
  userName: string;
  user: User | null;
  token: string | null;
  savedDesigns: SavedDesign[];
  login: (name: string, user?: User, token?: string) => void;
  logout: () => void;
  saveDesign: (design: SavedDesign) => void;
  updateDesignMeasurements: (id: string, measurements: Measurements, fabricInfo: FabricInfo) => void;
  setUser: (user: User, token: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [user, setUserState] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUserState(userData);
        setToken(savedToken);
        setIsLoggedIn(true);
        setUserName(userData.name);
      } catch (error) {
        console.error("Failed to restore session:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (name: string, userData?: User, authToken?: string) => {
    setIsLoggedIn(true);
    setUserName(name);

    if (userData && authToken) {
      setUserState(userData);
      setToken(authToken);
      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setUserState(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const setUser = (userData: User, authToken: string) => {
    setUserState(userData);
    setToken(authToken);
    setIsLoggedIn(true);
    setUserName(userData.name);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const saveDesign = (design: SavedDesign) => {
    setSavedDesigns((prev) => {
      const exists = prev.findIndex((d) => d.id === design.id);
      if (exists >= 0) {
        const updated = [...prev];
        updated[exists] = design;
        return updated;
      }
      return [...prev, design];
    });
  };

  const updateDesignMeasurements = (id: string, measurements: Measurements, fabricInfo: FabricInfo) => {
    setSavedDesigns((prev) =>
      prev.map((d) => (d.id === id ? { ...d, measurements, fabricInfo } : d))
    );
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, userName, user, token, savedDesigns, login, logout, saveDesign, updateDesignMeasurements, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
