import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Montserrat, Nunito, Poppins } from "next/font/google";
import { ToastContainer } from 'react-toastify'

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap"
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
})

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600"],
})


export const metadata: Metadata = {
  title: "Reevs",
  description: "Connect the smart way",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${inter.variable} ${poppins.variable} ${nunito.variable} antialiased font-inter text-gray-300 bg-gray-200`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
