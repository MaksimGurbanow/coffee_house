import classes from "./MobileApp.module.scss";
import AppleStore from "../../../../assets/apple.svg?react";
import GooglePlay from "../../../../assets/google-play.svg?react";
import MobileScreen from "../../../../images/mobile-screens.png";

const MobileApp = () => {
  return (
    <section className={classes.mobileApp} id="mobile-app">
      <div className={classes.container}>
        <div className={classes.offer}>
          <h2>
            <span className={classes.skewed}>Download</span> our apps to start
            ordering
          </h2>
          <div>
            Download the Resource app today and experience the comfort of
            ordering your favorite coffee from wherever you are
          </div>
          <div className={classes.buttons}>
            <button>
              <AppleStore className={classes.icon} />
              <span className={classes.text}>
                Available on the
                <strong>App Store</strong>
              </span>
            </button>
            <button>
              <GooglePlay className={classes.icon} />

              <span className={classes.text}>
                Available on
                <strong>Google Play</strong>
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
