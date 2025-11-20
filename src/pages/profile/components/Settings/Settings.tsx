import { useTranslation } from "react-i18next";
import classes from "./Settings.module.scss";
import cn from "classnames";

const Settings = () => {
  const { i18n, t } = useTranslation();

  const languages = ["ru", "en", "tr"];

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <section className={classes.settings}>
      <div className={classes.languageSettingContainer}>
        <h4>{t("lng_setting")}</h4>
        <div className={classes.languageSetting}>
          {languages.map((lang) => (
            <span
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={cn(classes.languageOption, {
                [classes.active]: i18n.language === lang,
              })}
            >
              {lang.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Settings;
