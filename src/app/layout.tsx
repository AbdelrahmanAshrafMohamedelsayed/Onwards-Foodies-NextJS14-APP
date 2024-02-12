import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/Main-Header/Main-Header";
import HeaderBackground from "@/components/Header-Background/Header-Background";

export const metadata: Metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeaderBackground />
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
