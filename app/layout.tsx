import type { Metadata } from "next";
import "./globals.css";
import LayoutNavbar from "@/components/layout/navbar";
import { ReactNode } from "react";
import localFont from "next/font/local";
import Favicon from "@/public/image/favicon.png";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stanislas Desjeux",
  description:
    "Stanislas Desjeux est un photographe de nature morte vivant et travaillant à Paris. Son activité s’équilibre entre travail éditorial, commande publicitaire, et une recherche artistique et expérimentale plus personnelle.",
  icons: {
    icon: [{ rel: "icon", url: Favicon.src }],
  },
  openGraph: {
    title: "Stanislas Desjeux",
    description:
      "Stanislas Desjeux est un photographe de nature morte vivant et travaillant à Paris. Son activité s’équilibre entre travail éditorial, commande publicitaire, et une recherche artistique et expérimentale plus personnelle.",
    siteName: "Stanislas Desjeux Website",
    type: "website",
  },
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
