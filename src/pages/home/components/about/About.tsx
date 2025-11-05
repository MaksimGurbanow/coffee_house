import cn from "classnames";
import classes from "./About.module.scss";
import About1 from "../../../../images/about-1.jpg";
import About2 from "../../../../images/about-2.jpg";
import About3 from "../../../../images/about-3.jpg";
import About4 from "../../../../images/about-4.jpg";

const About = () => {
  return (
    <section className={classes.about} id="about">
      <div className={classes.aboutContainer}>
        <h2>
          Resource is <span>the perfect and cozy place</span> where you can
          enjoy a variety of hot beverages, relax, catch up with friends, or get
          some work done.
        </h2>
        <div className={classes.images}>
          <div
            className={cn(classes.imageItem, classes.large)}
            style={{ gridRow: "span 4" }}
          >
            <img src={About1} alt="about 1 image" />
          </div>
          <div className={classes.imageItem} style={{ gridRow: "span 3" }}>
            <img src={About3} alt="about 3 image" />
          </div>
          <div
            className={cn(classes.imageItem, classes.large)}
            style={{ gridRow: "span 4" }}
          >
            <img src={About4} alt="about 4 image" />
          </div>
          <div className={classes.imageItem} style={{ gridRow: "span 3" }}>
            <img src={About2} alt="about 2 image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
