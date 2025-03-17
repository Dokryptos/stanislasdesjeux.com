import type { Metadata } from "next";
import "./globals.css";
import LayoutNavbar from "@/components/layout/navbar";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Stanislas Desjeux",
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <LayoutNavbar />
        {children}
      </body>
    </html>
  );
}
