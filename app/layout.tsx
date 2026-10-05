import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#4f46e5',
};

export const metadata: Metadata = {
  title: 'Prarambh Path — AI Study Toolkit | Class 8–10',
  description:
    'Learn to use AI to learn better. An AI literacy and prompt engineering toolkit for Class 8–10 students following the philosophy: Choose. Ask. Check. Learn.',
  keywords: [
    'Prarambh Path',
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
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50/50 text-slate-900 selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
