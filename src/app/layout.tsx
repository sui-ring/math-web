import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import React from "react";

import BreadcrumbNav from "../../common/breadcrumb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "[GeminiAI生成] 講義と漫才で学ぶ算数数学",
  description: "講義と漫才で学ぶ算数数学です。Google Gemini AIが各数学公式を講義、漫才形式で出力しました。自分にあった出力を選択し算数や数学を学ぶことができます。",
  verification: {
    // <meta name="google-site-verification" content="eONIAiWLaZ_HYxHcKTUBuw8KDWH0SDyckup2RPcP4D0" />
    google: "eONIAiWLaZ_HYxHcKTUBuw8KDWH0SDyckup2RPcP4D0",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BreadcrumbNav />
        {children}
      </body>
    </html>
  );
}
