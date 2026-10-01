import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "ko" | "en";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

// 우선순위: ?lang= 파라미터 > 저장된 선택 > 브라우저 언어(한국어가 아니면 영어)
function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "ko";

  const param = new URLSearchParams(window.location.search).get("lang");
  if (param === "en" || param === "ko") return param;

  try {
    const storedLanguage = window.localStorage.getItem("ecyce-language");
    if (storedLanguage === "en" || storedLanguage === "ko") return storedLanguage;
  } catch {
    /* storage unavailable */
  }

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return browserLanguages.some((lang) => lang?.toLowerCase().startsWith("ko")) ? "ko" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    try {
      window.localStorage.setItem("ecyce-language", language);
    } catch {
      /* storage unavailable */
    }
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
