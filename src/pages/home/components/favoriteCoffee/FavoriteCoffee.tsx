import classes from "./FavoriteCoffee.module.scss";
import ArrowLeft from "../../../../assets/arrow-left.svg?react";
import ArrowRight from "../../../../assets/arrow-right.svg?react";
import { useSlider } from "../../../../hooks/useSlider.ts";
import SlideItem from "../slideItem/SlideItem";
import Error from "../../../../shared/components/error/Error";
import cn from "classnames";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";

const FavoriteCoffee = () => {
  const { t } = useTranslation();
  const {
    slides,
    error,
    currentIndex,
    setNextIndex,
    setPrevIndex,
    setCurrentIndex,
  } = useSlider();

  useEffect(() => {
    setTimeout(() => {
      setCurrentIndex(0);
    }, 150);
  }, [setCurrentIndex]);

  return (
    <section className={classes.favouriteCoffee} id="favourite-coffee">
      <div className={classes.container}>
        <h2>
          <Trans i18nKey="fav_coffee">
            Choose your <span className={classes.skewed}>favorite</span> coffee
          </Trans>
        </h2>

        <div className={classes.slider}>
          {!!slides.length && (
            <button className={classes.previous} onClick={setPrevIndex}>
              <ArrowLeft />
            </button>
          )}

          <div
            className={classes.slides}
            style={{
              transition: "transform 0.5s ease",
              display: "flex",
            }}
          >
            {Boolean(slides.length) &&
              slides.map((slide, index) => (
                <SlideItem
                  key={slide.id || index}
                  path={slide.path}
                  title={slide.name}
                  description={slide.description}
                  price={slide.price}
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                />
              ))}
            {error && <Error message={t("error")} />}
          </div>

          {!!slides.length && (
            <button className={classes.next} onClick={setNextIndex}>
              <ArrowRight />
            </button>
          )}
        </div>

        {!error && (
          <div className={classes.controls}>
            {slides.map((_, index) => (
              <div
                key={index}
                className={cn(classes.controlItem, {
                  [classes.activeControl]: index === currentIndex,
                })}
              ></div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoriteCoffee;
