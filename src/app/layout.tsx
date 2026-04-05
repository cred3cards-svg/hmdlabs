import type { Metadata } from "next";
import { Sora, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://hmdlabs.in",
  ),
  title: {
    default: "HMD Labs – West Bengal | Fully NABL Accredited | 24×7 Operations",
    template: "%s | HMD Labs West Bengal",
  },
  description:
    "HMD Labs is West Bengal's most trusted NABL accredited diagnostic laboratory. 24×7 operations across all 23 districts. Book blood tests, health packages, get reports online.",
  keywords: [
    "HMD Labs West Bengal",
    "NABL accredited lab West Bengal",
    "diagnostic lab Kolkata",
    "blood test West Bengal",
    "health packages Kolkata",
    "pathology lab West Bengal",
    "24x7 lab West Bengal",
    "home sample collection Kolkata",
    "franchise diagnostic lab WB",
  ],
  authors: [{ name: "HMD Labs" }],
  creator: "HMD Labs",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hmdlabs.in",
    siteName: "HMD Labs West Bengal",
    title: "HMD Labs – West Bengal | Fully NABL Accredited | 24×7 Operations",
    description:
      "West Bengal's most trusted NABL accredited diagnostic laboratory. Book tests, download reports, explore franchise opportunities.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HMD Labs West Bengal - NABL Accredited Laboratory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HMD Labs West Bengal | NABL Accredited | 24×7",
    description: "Book diagnostic tests, health packages. Home collection across West Bengal.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-white antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "12px",
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              fontWeight: "500",
            },
          }}
        />
      </body>
    </html>
  );
}
