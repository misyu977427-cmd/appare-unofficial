// src/app/layout.tsx
import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "700"],
  subsets: ["latin"], // ✅ ここを 'subset' から 'subsets' に修正しました
});

// ✅ OGP設定を含むメタデータの定義
export const metadata: Metadata = {
  title: "Appare! UNOFFICIAL | 非公式ファンサイト",
  description: "9人組女性アイドルグループ Appare! の活動をアーカイブし、魅力を伝える非公式ファンサイトです。",
  
  openGraph: {
    title: "Appare! UNOFFICIAL",
    description: "Appare! の魅力を詰め込んだ非公式アーカイブサイト。現在セトリ機能も準備中！",
    url: "https://appare-unofficial.vercel.app/",
    siteName: "Appare! UNOFFICIAL",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Appare! UNOFFICIAL ロゴ",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Appare! UNOFFICIAL",
    description: "Appare! の活動をアーカイブする非公式ファンサイト",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${zenKaku.className} antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}