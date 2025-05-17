import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "이모지 매치 - 상황에 딱 맞는 이모지 추천",
  description:
    "상황을 설명하면 가장 잘 어울리는 이모지를 찾아드려요. 친구와의 대화, SNS 게시물, 메시지에 딱 맞는 이모지를 한 번에 찾을 수 있어요!",
  keywords:
    "이모지, 이모티콘, 이모지 추천, 이모지 매치, 상황별 이모지, 메시지 이모지",
  authors: [{ name: "Coincidence-one" }],
  creator: "Coincidence-one",
  openGraph: {
    title: "이모지 매치 - 상황에 딱 맞는 이모지 추천",
    description:
      "상황을 설명하면 가장 잘 어울리는 이모지를 찾아드려요. 친구와의 대화, SNS 게시물, 메시지에 딱 맞는 이모지를 한 번에 찾을 수 있어요!",
    url: "https://emoj-match.app",
    type: "website",
    locale: "ko_KR",
    siteName: "이모지 매치",
    images: [
      {
        url: "https://emoj-match.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "이모지 매치 - 상황에 딱 맞는 이모지 추천",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "이모지 매치 - 상황에 딱 맞는 이모지 추천",
    description:
      "상황을 설명하면 가장 잘 어울리는 이모지를 찾아드려요. 친구와의 대화, SNS 게시물, 메시지에 딱 맞는 이모지를 한 번에 찾을 수 있어요!",
    images: [
      {
        url: "https://emoj-match.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "이모지 매치 - 상황에 딱 맞는 이모지 추천",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
          {children}
        </main>
      </body>
    </html>
  );
}
