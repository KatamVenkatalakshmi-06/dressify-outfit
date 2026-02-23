import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { SavedDesign, Measurements, FabricInfo } from "@/data/designs";

interface AppState {
  isLoggedIn: boolean;
  userName: string;
  user: User | null;
  session: Session | null;
  loading: boolean;
  savedDesigns: SavedDesign[];
  login: (name: string) => void;
  logout: () => Promise<void>;
  saveDesign: (design: SavedDesign) => void;
  updateDesignMeasurements: (id: string, measurements: Measurements, fabricInfo: FabricInfo) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const name = session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User";
        setUserName(name);
      } else {
        setUserName("");
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const name = session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User";
        setUserName(name);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isLoggedIn = !!session;

  const login = (name: string) => {
    setUserName(name);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setUserName("");
    setSavedDesigns([]);
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
    <AppContext.Provider value={{ isLoggedIn, userName, user, session, loading, savedDesigns, login, logout, saveDesign, updateDesignMeasurements }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
