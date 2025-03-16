import type { Metadata } from "next";
import "./globals.css";
import LayoutNavbar from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "Stanislas Desjeux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <LayoutNavbar />
        {children}
      </body>
    </html>
  );
}
