import classes from "./CoffeeIntro.module.scss";
import videoSrc from "../../../../videos/video(720p).mp4";
import coffeeCup from "../../../../images/coffee-cup.png";
import { Link } from "react-router";

const CoffeeIntro = () => {

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
        <h1>
          <span className={classes.skewed}>Enjoy</span> premium coffee at our
          charming cafe
        </h1>

        <p>
          With its inviting atmosphere and delicious coffee options, the Coffee
          House Resource is a popular destination for coffee lovers and those
          seeking a warm and inviting space to enjoy their favorite beverage.
        </p>

        <Link to="/menu" className={classes.menuLink}>
          <span>Menu</span>
          <img src={coffeeCup} alt="coffee cup" />
        </Link>
      </div>
    </div>
  );
};

export default CoffeeIntro;
