import { useCallback, useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LocationContext } from "./LocationContext";
import { useLocation, useNavigate } from "react-router";

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const switchLanguage = useCallback(
    (language: "en" | "ru" | "tr") => {
      i18n.changeLanguage(language);
    },
    [i18n]
  );

  useEffect(() => {
    if (localStorage.getItem("i18nextLng") || location.search) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            {
              headers: { "User-Agent": "YourAppName/1.0" },
            }
          );

          const data = await response.json();
          const country = data.address?.country;

          if (country === "Turkey") {
            switchLanguage("tr");
          } else if (country === "Russia") {
            switchLanguage("ru");
          } else {
            switchLanguage("en");
          }
        } catch (err) {
          console.error("Failed to detect location:", err);
        }
      },
      (err) => {
        console.warn("Geolocation denied:", err.message);
      }
    );
  }, [location.search, switchLanguage]);

  useEffect(() => {
    document.documentElement.lang = i18n.language;

    const params = new URLSearchParams(location.search);
    if (params.get("lng") !== i18n.language) {
      params.set("lng", i18n.language);
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [i18n.language, location.search, navigate]);

  return (
    <LocationContext.Provider value={{ switchLanguage }}>
      {children}
    </LocationContext.Provider>
  );
};
