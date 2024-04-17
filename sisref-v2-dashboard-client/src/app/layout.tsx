import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";

const inter = Roboto_Slab({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

process.env.TZ = "America/Sao_Paulo";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-cinza-400"}>{children}</body>
    </html>
  );
}
