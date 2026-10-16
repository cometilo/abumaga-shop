"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [current, setCurrent] = useState(0);
  const hasMultiple = images.length > 1;

  function prev() {
    setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function next() {
    setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="space-y-4">
      {/* Основное фото */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-base bg-border">
        <Image
          src={images[current]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />

        {/* Стрелки */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Предыдущее фото"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/80 text-foreground backdrop-blur transition-colors hover:bg-surface"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Следующее фото"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/80 text-foreground backdrop-blur transition-colors hover:bg-surface"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Индикатор (точки) */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Фото ${i + 1}`}
                  className={
                    i === current
                      ? "h-1.5 w-6 rounded-full bg-accent transition-all"
                      : "h-1.5 w-1.5 rounded-full bg-foreground/30 transition-all hover:bg-foreground/50"
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Миниатюры */}
      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Показать фото ${i + 1}`}
              className={
                i === current
                  ? "relative aspect-square w-16 shrink-0 overflow-hidden rounded-md border-2 border-accent"
                  : "relative aspect-square w-16 shrink-0 overflow-hidden rounded-md border border-border opacity-70 transition-opacity hover:opacity-100"
              }
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}