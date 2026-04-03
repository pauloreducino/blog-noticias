import type { Metadata } from "next";
import "./globals.css";
import { SiteLayout } from "@/components/ui/SiteLayout";
import { CMSProvider } from "@/contexts/CMSContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Portal de Notícias do Maranhão`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Portal de Notícias do Maranhão`,
    description: SITE_DESCRIPTION,
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: SITE_NAME },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Portal de Notícias do Maranhão`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-base text-text-primary font-body antialiased">
        <AuthProvider>
          <CMSProvider>
            <SiteLayout>{children}</SiteLayout>
          </CMSProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
