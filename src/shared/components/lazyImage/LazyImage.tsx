import { useEffect, useState, type ImgHTMLAttributes } from "react";

const Image = ({
  id,
  ...props
}: { id: number | string } & ImgHTMLAttributes<HTMLImageElement>) => {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await import(`../../../images/products/${id}.jpg`);
        setSrc(image.default);
      } catch {
        setSrc("");
      }
    };
    loadImage();
  }, [id]);

  if (!src) return null;

  return <img src={src} alt={`Product ${id}`} {...props} />;
};

export default Image;
