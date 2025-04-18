import type { Metadata } from "next";
import "./globals.css";
import LayoutNavbar from "@/components/layout/navbar";
import { ReactNode } from "react";
import localFont from "next/font/local";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stanislas Desjeux",
};

type Props = {
  children: ReactNode;
};

const ppFragment = localFont({
  src: [
    {
      path: "../fonts/PPFragment-GlareLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/PPFragment-GlareLightItalic.otf",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-ppFragment",
});
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body
        className={`${ppFragment.variable} h-full text-black antialiased font-ppFragment`}
      >
        <LayoutNavbar />
        {children}
      </body>
    </html>
  );
}
