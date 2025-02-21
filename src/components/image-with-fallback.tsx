"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  fallback: string;
  src: string;
  alt: string;
}

export default function ImageWithFallback({
  fallback,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, []);

  return <Image alt={alt} onError={() => setError(true)} src={error ? fallback : src} {...props} />;
}
