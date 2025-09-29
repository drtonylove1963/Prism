import { AuthDialogWrapper } from "@/components/auth-dialog-wrapper";
import { DynamicFontLoader } from "@/components/dynamic-font-loader";
import { GetProDialogWrapper } from "@/components/get-pro-dialog-wrapper";
import { PostHogInit } from "@/components/posthog-init";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/lib/query-client";
import type { Metadata, Viewport } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prism — Visual Theme Editor for shadcn/ui with AI Generation",
  description:
    "Create beautiful themes for shadcn/ui with Prism's AI-powered visual editor. Supports Tailwind CSS v4, AI theme generation from text or images, and real-time preview. Export production-ready CSS instantly.",
  keywords:
    "theme editor, theme generator, AI theme generator, shadcn, ui, components, react, tailwind, editor, visual editor, OKLCH, web development, frontend, design system, UI components, React components, Tailwind CSS, shadcn/ui themes, AI design",
  authors: [{ name: "Prism Team" }],
  openGraph: {
    title: "Prism — Visual Theme Editor for shadcn/ui with AI Generation",
    description:
      "Create beautiful themes for shadcn/ui with Prism's AI-powered visual editor. Generate themes from text descriptions or images, customize in real-time, and export production-ready CSS.",
    url: "https://github.com/drtonylove1963/Prism",
    siteName: "Prism",
    images: [
      {
        url: "/og-image.v050725.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prism — Visual Theme Editor for shadcn/ui with AI Generation",
    description:
      "Create beautiful themes for shadcn/ui with Prism's AI-powered visual editor. Generate themes from text descriptions or images, customize in real-time, and export production-ready CSS.",
    images: ["/og-image.v050725.png"],
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <DynamicFontLoader />
        <link rel="icon" href="/prism.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/prism.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* PRELOAD FONTS USED BY BUILT-IN THEMES */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fira+Code:wght@300..700&family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400..700;1,400..700&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Outfit:wght@100..900&family=Oxanium:wght@200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <meta name="darkreader-lock" />
      </head>
      <body suppressHydrationWarning>
        <NuqsAdapter>
          <Suspense>
            <QueryProvider>
              <ThemeProvider defaultTheme="light">
                <TooltipProvider>
                  <AuthDialogWrapper />
                  <GetProDialogWrapper />
                  <Toaster />
                  {children}
                </TooltipProvider>
              </ThemeProvider>
            </QueryProvider>
          </Suspense>
        </NuqsAdapter>
        <PostHogInit />
      </body>
    </html>
  );
}
