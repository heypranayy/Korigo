"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  productName: string;
  isSoldOut?: boolean;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  isSoldOut,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [
    { id: 1, src: "/assets/korigo/products/citrus.webp", alt: productName },
  ];

  const activeImage = displayImages[selectedIndex] || displayImages[0];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails Row / Column */}
      <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[500px] no-scrollbar flex-shrink-0">
        {displayImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative w-16 h-16 md:w-20 md:h-20 rounded border bg-[#fbfbfb] flex-shrink-0 overflow-hidden transition-all ${
              selectedIndex === idx
                ? "border-korigo-green ring-1 ring-korigo-green"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Image
              src={img.src}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              className="object-contain p-1"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main Large Image */}
      <div className="relative aspect-square w-full max-w-[550px] mx-auto bg-[#fafafa] rounded border border-gray-100 flex items-center justify-center overflow-hidden">
        {isSoldOut && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-neutral-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm font-serif">
              Sold Out
            </span>
          </div>
        )}
        <Image
          src={activeImage.src}
          alt={activeImage.alt || productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 550px"
          className="object-contain p-4 md:p-8 transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};
