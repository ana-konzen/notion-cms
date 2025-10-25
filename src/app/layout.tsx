import { Nunito } from "next/font/google";
import NavBar from "@/app/nav/NavBar";

import "./globals.css";

const sans = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Notion CMS Example",
  description: "A simple example of a website integrating Notion as CMS",
};

export const revalidate = 60;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sans.variable} bg-background antialiased font-sans`}>
        <NavBar />
        <div className="px-8 absolute w-screen right-0 md:w-content-md">
          <div className="flex relative mt-28 w-full flex-col md:mt-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
