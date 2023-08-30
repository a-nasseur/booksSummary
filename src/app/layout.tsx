import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';


import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreProvider from '@/lib/StoreProvider';
import AuthSessionProvider from '@/lib/AuthSessionProvider';

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
    <html lang="en" data-theme="garden">
        <body className={`${inter.className}`}>
          <StoreProvider>
            <AuthSessionProvider>
              <Navbar />
                {children}
              <Footer />
            </AuthSessionProvider>
          </StoreProvider>
        </body>
    </html>
  )
}
