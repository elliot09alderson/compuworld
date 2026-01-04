import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ['latin'] });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });

export const metadata: Metadata = {
  title: 'Compu World | Ultimate Gaming Gear',
  description: 'High-performance laptops, PCs, and repair services.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${orbitron.variable} min-h-screen flex flex-col font-sans`} suppressHydrationWarning>
        <Providers>
            <Navbar />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
        </Providers>
      </body>
    </html>
  );
}
