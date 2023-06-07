import React, { ImgHTMLAttributes, useEffect, useRef, useState } from "react";

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  onLazyLoad?: () => void;
  src: string;
};

const LazyImage = (props: LazyImageProps) => {
  const { src, className, onLazyLoad } = props;
  const [URL, setURL] = useState("");

  const ref = useRef<HTMLImageElement>(null);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onLazyLoad && onLazyLoad();
        setURL(src);
      }
    });
  });

  useEffect(() => {
    observer.observe(ref.current!);
    return () => {
      observer.disconnect();
    };
  }, [props]);

  return (
    <img
      {...props}
      alt={props.alt}
      className={`${className} w-96 h-96 bg-gray-200`}
      ref={ref}
      src={URL}
    />
  );
};

export default LazyImage;
