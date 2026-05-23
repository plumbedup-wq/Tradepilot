import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradePilot Auth",
  description: "Modern login and signup for your job management platform"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
