import './globals.css';
import { Geist } from 'next/font/google';

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-geist',
});

export const metadata = {
  title: {
    default: 'Mega Game Hub 🎮',
    template: '%s | Mega Game Hub',
  },
  description: 'A collection of retro web games built with Next.js and GSAP.',
  keywords: ['Mega Game Hub', 'Next.js games', 'Tic Tac Toe', 'Snake Water Gun', 'Perfect Guess'],
  openGraph: {
    title: 'Mega Game Hub 🎮 by Dev Armaan',
    url: 'https://yourdomain.com',
    siteName: 'Mega Game Hub',
    images: [{ url: '/preview.webp', width: 1200, height: 630, alt: 'Game Hub Preview' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mega Game Hub 🎮',
    images: ['/preview.jpg'],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="font-geist bg-black text-white">{children}</body>
    </html>
  );
}
