import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Notification } from '@/components/Notification';
import AuthProviders from '@/components/AuthProviders';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QueryProvider from '@/components/QueryProvider';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';


const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Us Restaurant',
  description: 'Best food in town!!!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProviders>
        <QueryProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Notification />
          <Navbar />
          {children}
          <Footer />
          <ToastContainer position="bottom-right" theme="dark" autoClose={3000}/>
        </body>
        </QueryProvider>
      </AuthProviders>
    </html>
  );
}
