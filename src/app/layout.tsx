import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';


import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreProvider from '@/lib/StoreProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My books summary',
  description: 'keep track of my books reading',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
        <body className={`${inter.className}`}>
          <StoreProvider>
            <Navbar />
              {children}
            <Footer />
          </StoreProvider>
        </body>
    </html>
  )
}
