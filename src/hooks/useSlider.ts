import { useCallback, useEffect, useState } from "react";
import type { CardProduct } from "../types/types";
import { getFavoriteProducts } from "../api";

export const useSlider = () => {
  const [slides, setSlides] = useState<CardProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [slidesWithImages, setSlidesWithImages] = useState<
    ({ path: string } & CardProduct)[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const setNextIndex = useCallback(() => {
    setCurrentIndex((prev) => {
      return slidesWithImages.length ? (prev + 1) % slidesWithImages.length : 0;
    });
  }, [slidesWithImages.length]);

  const setPrevIndex = useCallback(() => {
    setCurrentIndex((prev) => {
      return slidesWithImages.length
        ? (prev - 1 + slidesWithImages.length) % slidesWithImages.length
        : 0;
    });
  }, [slidesWithImages.length]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const products = await getFavoriteProducts();
        setSlides(products);
        setError(null);
      } catch {
        setError("Something went wrong. Please, refresh the page");
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (!slides || slides.length === 0) return;

    let isCancelled = false;

    const loadImages = async () => {
      const results = await Promise.all(
        slides.map(async (slide) => {
          const image = await import(`../images/products/${slide.id}.jpg`);
          return { ...slide, path: image.default || image };
        })
      );
      if (!isCancelled) setSlidesWithImages(results);
    };

    loadImages();

    return () => {
      isCancelled = true;
    };
  }, [slides]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextIndex();
    }, 5000);
    return () => clearInterval(interval);
  }, [setNextIndex]);

  return {
    slides: slidesWithImages,
    error,
    currentIndex,
    setNextIndex,
    setPrevIndex,
    setCurrentIndex,
  };
};
