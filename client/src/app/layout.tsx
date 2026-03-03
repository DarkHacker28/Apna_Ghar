import type { Metadata } from 'next';
import './globals.css';
import { ReduxProvider } from '../components/ReduxProvider';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const metadata: Metadata = {
  title: 'Apna Ghar — Premium Rental Properties',
  description: 'Discover extraordinary rental properties with Apna Ghar. NYC\'s finest apartments, penthouses, lofts, and townhouses.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ReduxProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
