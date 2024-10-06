import React, { createContext, useContext, useState, useEffect } from "react";
import { labels } from "../utils/resources";

const LanguageContext = createContext({
  labels: {},
  setLanguage: (lang: string) => {},
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState("en-us");
  const [label, setLabel] = useState({});

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en-us";
    setLanguage(storedLanguage);
    labels(storedLanguage).then(setLabel);
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    labels(lang).then(setLabel);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{ labels: label, setLanguage: changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
