import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClipFlow AI - Twitch to Viral Clips",
  description: "Automatically turn your Twitch streams into viral clips for X, YouTube Shorts & TikTok",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}