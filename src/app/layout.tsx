import type { Metadata } from "next";
import { Andada_Pro, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../lib/context/CartContext";
import { PageLoader } from "../components/ui/PageLoader";
import { AnnouncementBar } from "../components/layout/AnnouncementBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { CartDrawer } from "../components/cart/CartDrawer";
import { websiteSchema, organizationSchema } from "../lib/schema";

const andada = Andada_Pro({
  subsets: ["latin"],
  variable: "--font-andada",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${andada.variable} ${inter.variable}`}>
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
          <PageLoader />
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
