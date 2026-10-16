import React from "react";
import Image from "next/image";
import { Utensils, Clock, CheckCircle } from "lucide-react";

interface Recipe {
  name: string;
  image?: string;
  ingredients: string;
  instructions: string;
}

interface RecipeGuideSectionProps {
  recipes: Recipe[];
  flavourName: string;
}

export const RecipeGuideSection: React.FC<RecipeGuideSectionProps> = ({
  recipes,
  flavourName,
}) => {
  if (!recipes || recipes.length === 0) return null;

  const cleanName = flavourName
    .replace(/Korigo\s*Pops/i, "")
    .replace(/Flavoured.*$/i, "")
    .replace(/Foxnuts.*$/i, "")
    .replace(/\|\s*Spicy.*$/i, "")
    .replace(/\|\s*35g.*$/i, "")
    .trim() || flavourName;

  return (
    <section className="py-14 pb-20 border-t border-gray-100 bg-[#fafafa] -mx-4 md:-mx-8 px-4 md:px-8 mt-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-korigo-green font-bold text-xs uppercase tracking-wider mb-2 font-serif">
            <Utensils className="w-4 h-4" />
            <span>Chef's Inspiration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-black mb-2">
            Our Favorite Recipes with {cleanName}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-serif">
            Makhana isn't just for snacking out of the bag. Elevate everyday dishes with signature crunchy toppings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded border border-gray-200/80 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Recipe Image if available */}
                {r.image && (
                  <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-korigo-lightGreen text-korigo-darkGreen text-[11px] font-bold px-2 py-0.5 rounded uppercase">
                      Recipe #{i + 1}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                      <Clock className="w-3 h-3" /> 5-10 Mins
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-black mb-3">
                    {r.name}
                  </h3>

                  {/* Ingredients */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Ingredients:
                    </h4>
                    <p className="text-xs text-gray-700 leading-relaxed font-serif">
                      {r.ingredients}
                    </p>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Preparation:
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-serif">
                      {r.instructions}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50/80 border-t border-gray-100 text-xs text-korigo-darkGreen font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-korigo-green" />
                <span>Superfood Crunch Garnish</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
