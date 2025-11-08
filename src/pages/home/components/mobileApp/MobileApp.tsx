import classes from "./MobileApp.module.scss";
import AppleStore from "../../../../assets/apple.svg?react";
import GooglePlay from "../../../../assets/google-play.svg?react";
import MobileScreen from "../../../../images/mobile-screens.png";
import { Trans, useTranslation } from "react-i18next";

const MobileApp = () => {
  const { t } = useTranslation();
  return (
    <section className={classes.mobileApp} id="mobile-app">
      <div className={classes.container}>
        <div className={classes.offer}>
          <h2>
            <Trans i18nKey="mob_app">
              <span className={classes.skewed}>Download</span> our apps to start
              ordering
            </Trans>
          </h2>
          <div>{t("mob_app_description")}</div>
          <div className={classes.buttons}>
            <button className={classes.appButton}>
              <AppleStore className={classes.icon} />
              <span className={classes.text}>
                <Trans i18nKey="mob_app_apple">
                  Available on the
                  <strong>App Store</strong>
                </Trans>
              </span>
            </button>
            <button className={classes.appButton}>
              <GooglePlay className={classes.icon} />

              <span className={classes.text}>
                <Trans i18nKey="mob_app_google">
                  Available on
                  <strong>Google Play</strong>
                </Trans>
              </span>
            </button>
          </div>
        </div>
        <div className={classes.mobScreen}>
          <img src={MobileScreen} alt="mobile screens" />
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
