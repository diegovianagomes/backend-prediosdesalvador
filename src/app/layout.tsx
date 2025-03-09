import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Abril_Fatface } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";


// Add the new fonts
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

const abril = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril"
});

export const metadata: Metadata = {
  title: "Prédios de Salvador",
  description: "Bem vindo ao Prédios de Salvador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={` ${poppins.variable} ${abril.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}