import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Appare! Fan Space",
  description: "Appare!の魅力を伝えるファンサイト",
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