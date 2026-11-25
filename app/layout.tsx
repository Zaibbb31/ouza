import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ouza Cocktail Bar & Kitchen | Baner, Pune',
  description: 'Experience Ouza Cocktail Bar & Kitchen in Baner, Pune. Exceptional craft cocktails, artisanal beers, Mediterranean & global cuisine, and an unforgettable vibrant ambiance.',
  keywords: ['Ouza Pune', 'Ouza Cocktail Bar & Kitchen', 'Baner restaurant', 'cocktail bar Baner Pune', 'craft beer Pune', 'dining Baner'],
  openGraph: {
    title: 'Ouza Cocktail Bar & Kitchen | Baner, Pune',
    description: 'Vibrant cocktails, artisanal beers, and global comfort food in Baner, Pune.',
    url: 'https://maps.app.goo.gl/Qco2t8pqFt7poG3QA?g_st=ic',
    siteName: 'Ouza Cocktail Bar & Kitchen',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-full max-w-full overflow-x-hidden">
      <body className="w-full max-w-full overflow-x-hidden">{children}</body>
    </html>
  );
}
