// Schema definitions for SEO Structured Data (JSON-LD)

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://korigosnacks.com/#website",
  "url": "https://korigosnacks.com",
  "name": "Korigo",
  "publisher": {
    "@id": "https://korigosnacks.com/#organization",
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://korigosnacks.com/#organization",
  "name": "Korigo",
  "url": "https://korigosnacks.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://korigosnacks.com/cdn/shop/files/Untitled_design_8_9a03f168-3203-4942-b0b0-e445ec329911.png",
  },
  "foundingDate": "2025",
  "telephone": "+91 8981842929",
  "sameAs": [
    "https://www.instagram.com/korigosnacks/",
    "https://www.facebook.com/korigosnacks",
    "https://www.linkedin.com/company/korigosnacks",
  ],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://korigosnacks.com/#faq",
  "url": "https://korigosnacks.com/",
  "name": "Korigo Snacks – Frequently Asked Questions",
  "inLanguage": "en-IN",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makhana flavours does Korigo offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Korigo offers six different flavours of makhana: Citrus Cartel, Coco Island, Sour Crème d' Onion, Garlicked Cheese, Cinnamon Drip, and Sassy Sriracha, available as single 35g packs and curated 70g value combos.",
      },
    },
    {
      "@type": "Question",
      "name": "Is Korigo makhana roasted or fried?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Korigo makhana is 100% slow-roasted over a low flame and never fried. It contains 0% palm oil, which gives an airy, crisp crunch without the greasiness of fried snacks.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the nutritional value of Korigo's flavoured makhana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Korigo flavoured makhana provides 9.7g of plant protein per 100g, zero cholesterol and no palm oil. A 35g pack of Sassy Sriracha has about 148 kcal and 3.8g of dietary fibre. Values vary slightly by flavour, so check the nutrition label on each product page.",
      },
    },
    {
      "@type": "Question",
      "name": "What makes Korigo's makhana online purchase experience different?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Korigo offers same-day dispatch on orders placed before 2 PM, free express pan-India shipping on orders above ₹499, and dual-flavour combo packs that save ₹40. Every batch is made in an ISO 22000 facility and is FSSAI approved.",
      },
    },
    {
      "@type": "Question",
      "name": "Is makhana a healthy daily snack?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Makhana (fox nuts) is a light, high-fibre snack that is naturally low in sodium and contains no cholesterol. Korigo roasts it instead of frying it and uses real spices with no artificial colours or chemical preservatives, which makes it a smarter everyday alternative to fried chips when eaten in moderation.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I buy different makhana flavours in a single order?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You can mix any of the six flavours in one order, or choose a ready-made dual-flavour combo (70g) such as Garlic Cheese + Sassy Sriracha, which saves ₹40 compared with buying the two packs separately.",
      },
    },
    {
      "@type": "Question",
      "name": "Is Korigo flavoured makhana safe for kids?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Korigo makhana is 100% vegetarian, vegan, gluten free, non-GMO and made without artificial colours or chemical preservatives, and many parents share it with their children. Milder flavours such as Cinnamon Drip and Sour Crème d' Onion suit younger kids better than Sassy Sriracha. Very young children should only eat makhana under adult supervision, and parents of children with allergies should check the ingredient list first.",
      },
    },
    {
      "@type": "Question",
      "name": "Can diabetic people eat flavoured makhana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Makhana has a low glycemic load, and Korigo is roasted rather than fried. Some flavours, such as Coco Island and Cinnamon Drip, are sweeter than the savoury ones. People managing diabetes should check the nutrition label and consult their doctor or dietitian about portion size.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the shelf life of Korigo-flavoured makhana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The shelf life of Korigo-Flavoured Makhana is 8 months from the date of manufacture when stored in a cool, dry place.",
      },
    },
    {
      "@type": "Question",
      "name": "Is Korigo flavoured makhana good for weight loss?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Korigo makhana is a light, roasted snack with plant protein and fibre that helps you feel full, so it can fit into a calorie-conscious diet as a replacement for fried snacks. No single snack causes weight loss on its own, so portion size and your overall diet still matter.",
      },
    },
  ],
};
