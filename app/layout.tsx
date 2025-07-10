import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContent";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Ben Hicks",
  applicationName: "Ben Hicks",
  appleWebApp: {
    title: "Ben Hicks",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  description: "Ben Hicks Portfolio",
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    title: 'Ben Hicks - Software Engineer',
    description: 'Full-stack web applications, machine learning pipelines, and real-time embedded systems',
    siteName: 'Ben Hicks',
    images: [
      {
        url: '/og_image_v2.jpg', // You'll need to create this image
        width: 1200,
        height: 630,
        alt: 'Ben Hicks - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ben Hicks - Software Engineer',
    description: 'Full-stack web applications, machine learning pipelines, and real-time embedded systems',
    images: ['/og_image_v2.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'android-chrome',
        url: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome',
        url: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased overflow-x-hidden`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BW67NPNT7J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BW67NPNT7J');
          `}
        </Script>
        
        <ThemeProvider>
          <Header />
          {children}
          <Toaster 
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  marginTop: '60px', // Account for header height
                },
                success: {
                  duration: 3000,
                  style: {
                    background: '#059669',
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    background: '#DC2626',
                  },
                },
              }}
            />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
