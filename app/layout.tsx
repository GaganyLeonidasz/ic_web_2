import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "InterCelestial Webpage",
  description: "Homepage of the InterCelestial intergalactic videogame",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <h1>Welcome to the Homepage</h1>
        <Toaster></Toaster>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
