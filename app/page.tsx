"use client";
import { MouseEventHandler, useState } from "react";
import { random } from "lodash";

import LazyImage from "./components/LazyImage";

const generateId = () => random(1, 1000);

export default function Home() {
  const [images, setImages] = useState<ImageType[]>([]);

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const newImage: ImageType = {
      src: `https://picsum.photos/500/500?random=${generateId()}`,
      alt: "Random Image",
    };
    setImages([...images, newImage]);
    window.plausible("Signup");
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="center text-4xl text-center text-black my-4">
        NextJS + Typescript
      </h1>
      <button
        className="bg-yellow-300 hover:bg-yellow-400 w-fit px-4 py-2 rounded-md mb-4"
        onClick={handleOnClick}
      >
        Add New Random Image
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {images.map(({ src, alt, className }, idx) => (
          <LazyImage
            alt={alt}
            className={`rounded ${className}`}
            key={idx}
            src={src}
          />
        ))}
      </div>
    </main>
  );
}
