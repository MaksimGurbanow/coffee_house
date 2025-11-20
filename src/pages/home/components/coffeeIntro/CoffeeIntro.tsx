import classes from "./CoffeeIntro.module.scss";
import videoSrc from "../../../../videos/video(720p).mp4";
import coffeeCup from "../../../../images/coffee-cup.png";
import { Link } from "react-router";
import { Trans, useTranslation } from "react-i18next";

const CoffeeIntro = () => {
  const { t } = useTranslation();
  return (
    <div className={classes.wrap}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={classes.video}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={classes.content}>
        <h1 className={classes.contentTitle}>
          <Trans i18nKey="intro_title">
            <span className={classes.skewed}>Enjoy</span> premium coffee at our
            charming cafe
          </Trans>
        </h1>

        <p className={classes.contentParagraph}>{t("intro_description")}</p>

        <Link to="/menu" className={classes.menuLink}>
          <span>{t("menu")}</span>
          <img src={coffeeCup} alt="coffee cup" />
        </Link>
      </div>
    </div>
  );
};

export default CoffeeIntro;
