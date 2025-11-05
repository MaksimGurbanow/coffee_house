import { useEffect, useMemo, useRef, useState } from "react";

export const useWidthObserver = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const isMobile = useMemo(() => width <= 780, [width]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, width, isMobile };
};
