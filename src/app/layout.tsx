import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "../lib/context/CartContext";
import { AnnouncementBar } from "../components/layout/AnnouncementBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { CartDrawer } from "../components/cart/CartDrawer";
import { websiteSchema, organizationSchema } from "../lib/schema";

const andada = localFont({
  src: [
    {
      path: "../../public/fonts/andada-pro/AndadaPro-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/andada-pro/AndadaPro-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/andada-pro/AndadaPro-600.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/andada-pro/AndadaPro-700.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/andada-pro/AndadaPro-800.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-andada",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://backend-korigo.sampledomain.online"),
  title: {
    default: "Korigo Snacks — Crunchy Flavoured Makhana | Roasted Superfood Pops",
    template: "%s | Korigo Snacks",
  },
  description:
    "Crunchy flavoured makhana with bold seasonings and high protein. 100% roasted, non-fried healthy snacks made for smart everyday munching.",
  keywords: [
    "makhana",
    "fox nuts",
    "flavoured makhana",
    "roasted makhana",
    "healthy snacks",
    "protein snacks",
    "superfood",
    "Korigo Snacks",
  ],
  authors: [{ name: "Korigo Snacks" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://korigosnacks.com",
    siteName: "Korigo Snacks",
    title: "Korigo Snacks — Crunchy Flavoured Makhana",
    description: "100% slow-roasted flavoured makhana pops with authentic spices.",
    images: [
      {
        url: "/assets/korigo/hero/Roasted_Makhan_Pops_in_Irrestible_Flavours_7536984f-9e7c-49de-9f74-4943aad71e73.png",
        width: 1200,
        height: 630,
        alt: "Korigo Snacks Flavoured Makhana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Korigo Snacks — Crunchy Flavoured Makhana",
    description: "100% slow-roasted flavoured makhana pops with authentic spices.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={andada.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-serif bg-white text-gray-900 selection:bg-korigo-lightGreen selection:text-korigo-darkGreen">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
