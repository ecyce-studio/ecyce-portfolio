import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "ko" | "en";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "ko";

  const storedLanguage = window.localStorage.getItem("ecyce-language");
  return storedLanguage === "en" ? "en" : "ko";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem("ecyce-language", language);
    document.documentElement.lang = language === "ko" ? "ko" : "en";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === "ko" ? "en" : "ko"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
