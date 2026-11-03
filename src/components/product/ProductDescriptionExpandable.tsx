"use client";

import React, { useState } from "react";

interface ProductDescriptionExpandableProps {
  description: string;
}

export const ProductDescriptionExpandable: React.FC<ProductDescriptionExpandableProps> = ({
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  // If text is short enough (less than ~80 characters), no need for clamp
  const isLong = description.length > 80;

  return (
    <div className="text-sm text-gray-600 font-serif leading-relaxed pt-1">
      {isLong ? (
        <div>
          <p className={isExpanded ? "" : "line-clamp-1 inline"}>
            {description}
          </p>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-block ml-1.5 text-xs font-semibold text-korigo-darkGreen hover:text-korigo-green underline underline-offset-2 transition-colors cursor-pointer"
          >
            {isExpanded ? "Show less" : "... more"}
          </button>
        </div>
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
};

