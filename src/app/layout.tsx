import { Nunito } from "next/font/google";
import Link from "next/link";

import NavBar from "@/notion/layout/components/nav/NavBar";

import { addComponent } from "@/notion/compDict";

import CustomComponent from "@/app/CustomComponent";

import { notionConfig } from "@/notion/config";

import "./globals.css";

const sans = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Notion CMS Example",
  description: "A simple example of a website integrating Notion as a CMS",
};

export const revalidate = 60;

notionConfig.add({
  homePageId: "2975ddb24d8a80488119c7600e19d8f3",
  tocId: "2975ddb24d8a80dcb9c1ef9bd0b2f033",
  customMarker: ["<", ">"], // Symbol to identify custom components in callouts, default is ["<", ">"]
});

addComponent({ CustomComponent });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sans.variable} bg-background antialiased font-sans`}>
        <NavMenu />
        <div className="px-8 absolute w-screen right-0 md:w-content-md">
          <div className="flex relative mt-28 w-full flex-col md:mt-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

function NavMenu() {
  return (
    <div className="z-10 hidden border-r border-r-gray md:block h-screen fixed p-4 w-64">
      <Link href="/">
        <h1 className="font-bold mb-4">Notion Example</h1>
      </Link>
      <NavBar />
    </div>
  );
}
