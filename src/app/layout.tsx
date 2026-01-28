import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalSettingsProvider } from "@/context/GlobalSettingsContext";
import { getGlobalSettings } from "@/lib/api/global";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobalSettings();
  
  return {
    title: {
      default: settings.seo.defaultTitle || settings.siteName,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.seo.defaultDescription || settings.siteTagline,
    openGraph: {
      siteName: settings.siteName,
      images: settings.seo.ogImageUrl ? [settings.seo.ogImageUrl] : [],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch global settings server-side
  const globalSettings = await getGlobalSettings();

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalSettingsProvider settings={globalSettings}>
          {children}
        </GlobalSettingsProvider>
      </body>
    </html>
  );
}
