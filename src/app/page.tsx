export const revalidate = 0; // ✅ 常に最新データを同期

import { client } from "@/lib/microcms";
import Image from "next/image";
import Link from "next/link";

// 型定義
type TopSetting = {
  hero_image: { url: string };
};
type Member = { id: string; name: string; color: string; };
type News = { id: string; title: string; publishedAt: string; };

export default async function Home() {
  // ✅ microCMSから「集合写真(top)」「メンバー」「ニュース」を同時に取得
  const [topData, memberData, newsData] = await Promise.all([
    client.get<TopSetting>({ endpoint: "top" }), 
    client.getList<Member>({ endpoint: "members", queries: { limit: 1 } }),
    client.getList<News>({ endpoint: "news", queries: { orders: '-publishedAt', limit: 3 } }),
  ]);

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <header className="py-6 px-5 border-b-8 border-black sticky top-0 bg-white z-50 flex justify-between items-center">
        <h1 className="text-3xl font-black italic tracking-tighter">Appare! UNOFFICIAL</h1>
        <nav className="hidden md:flex gap-6 font-black text-sm uppercase">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="#members" className="hover:underline">Members</Link>
          <Link href="#news" className="hover:underline">News</Link>
        </nav>
      </header>

      {/* ✅ Plan B：microCMSから取得した画像を表示 */}
      <section className="bg-black text-white py-24 px-5 text-center">
        <div className="max-w-4xl mx-auto mb-10 border-4 border-white aspect-video relative overflow-hidden bg-gray-900 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)]">
          {topData.hero_image && (
            <Image src={topData.hero_image.url} alt="Appare! 全員集合写真" fill className="object-cover" priority />
          )}
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">世界を明るく照らす、9色の光。</h2>
        <p className="max-w-2xl mx-auto text-xl font-bold opacity-80 leading-relaxed">
          このサイトは、Appare!の魅力をアーカイブし、ファンと共に歩む非公式スペースです。
        </p>
      </section>

      {/* MEMBERS & NEWS セクション ...（中身は維持されます） */}
      {/* ... (省略) ... */}
    </main>
  );
}