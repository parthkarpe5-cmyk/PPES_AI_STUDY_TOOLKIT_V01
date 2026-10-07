import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0d1f35',
};

export const metadata: Metadata = {
  title: 'Prarambh Path — AI Study Toolkit | Class 8–10',
  description:
    'Learn to use AI to learn better. An educational AI literacy and prompt engineering toolkit for Class 8–10 students following the Gurukul-inspired philosophy: Choose. Ask. Check. Learn.',
  keywords: [
    'Prarambh Path',
    'PPES',
    'AI Study Toolkit',
    'Class 8 AI Study',
    'Class 9 AI Study',
    'Class 10 AI Study',
    'CBSE AI Prompts',
    'Responsible AI for Students',
    'Prompt Builder for School'
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fafbfc] text-[#1a1a1a] selection:bg-[#ff6b00] selection:text-white font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
