export const revalidate = 0;

import { client } from "@/lib/microcms";
import Image from "next/image";
import Link from "next/link";

// 型定義
type Member = {
  id: string;
  name: string;
  color: string;
  image?: { url: string };
};

type News = {
  id: string;
  title: string;
  date: string;
};

export default async function Home() {
  const [memberData, newsData] = await Promise.all([
    client.getList<Member>({ endpoint: "members", queries: { limit: 1 } }), // 存在確認のみ
    client.getList<News>({ endpoint: "news", queries: { orders: '-createdAt', limit: 3 } }),
  ]);

  const news = newsData.contents;

  return (
    <main className="min-h-screen bg-white text-black font-bold">
      {/* HEADER */}
      <header className="py-6 px-5 border-b-8 border-black sticky top-0 bg-white z-50 flex justify-between items-center">
        <h1 className="text-3xl font-black italic tracking-tighter">Appare! UNOFFICIAL</h1>
        <nav className="flex gap-4 text-xs uppercase underline">
          <a href="#members">Members</a>
          <a href="#news">News</a>
        </nav>
      </header>

      {/* MAIN VISUAL: 集合写真を表示 */}
      <section className="bg-black text-white py-20 px-5 text-center">
        <div className="max-w-5xl mx-auto mb-10 border-4 border-white aspect-video relative overflow-hidden shadow-[20px_20px_0px_0px_rgba(255,255,255,0.2)]">
          <Image 
            src="/all-members.jpg" 
            alt="Appare! 9色の光" 
            fill 
            className="object-cover"
            priority 
          />
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-6 italic tracking-tighter">世界を明るく照らす、9色の光。</h2>
        <p className="max-w-2xl mx-auto text-xl opacity-80">
          このサイトは、Appare!の魅力をアーカイブし、ファンと共に歩む非公式スペースです。
        </p>
      </section>

      {/* MEMBERS Stage 1: 入り口 */}
      <section id="members" className="max-w-7xl mx-auto py-24 px-5">
        <h2 className="text-5xl font-black mb-16 border-l-8 border-black pl-6 uppercase">Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/members" className="group relative block border-[6px] border-black bg-black p-12 shadow-[15px_15px_0px_0px_rgba(255,255,0,1)] transition-all hover:translate-x-1 hover:-translate-y-1">
            <h3 className="text-5xl font-black italic text-white">VIEW ALL MEMBERS →</h3>
          </Link>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="border-4 border-black p-10 flex items-center justify-center text-2xl font-black hover:bg-black hover:text-white transition-colors cursor-pointer">#既存メンバー</div>
            <div className="border-4 border-black p-10 flex items-center justify-center text-2xl font-black hover:bg-black hover:text-white transition-colors cursor-pointer">#新メンバー</div>
          </div>
        </div>
      </section>

      {/* NEWS Stage 1: 最新3件 */}
      <section id="news" className="bg-gray-100 py-24 px-5 border-y-[6px] border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black mb-16 border-l-8 border-black pl-6 uppercase">Latest News</h2>
          <div className="space-y-6">
            {news.map((item) => (
              <Link href={`/news/${item.id}`} key={item.id} className="block group border-b-4 border-black pb-6 hover:bg-white transition-all p-4">
                <p className="text-sm text-blue-600 mb-2">{new Date(item.date || (item as any).createdAt).toLocaleDateString('ja-JP')}</p>
                <h3 className="text-2xl font-black italic group-hover:underline">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}