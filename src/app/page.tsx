export const revalidate = 0;

import { client } from "@/lib/microcms";
import Image from "next/image";
import Link from "next/link";

// 型定義
type TopSetting = { hero_image: { url: string }; };
type Member = { id: string; name: string; color: string; };
type News = { id: string; title: string; publishedAt: string; };

export default async function Home() {
  // ✅ microCMSから「集合写真(top)」「メンバー」「ニュース」を同時に取得
  const [topData, memberData, newsData] = await Promise.all([
    client.get<TopSetting>({ endpoint: "top" }), 
    client.getList<Member>({ endpoint: "members", queries: { limit: 10 } }),
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

      {/* メインビジュアル：背景を黒くし、写真を表示 */}
      <section className="bg-black text-white py-24 px-5 text-center">
        <div className="max-w-4xl mx-auto mb-10 border-4 border-white aspect-video relative overflow-hidden bg-gray-900 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)]">
          {topData.hero_image && (
            <Image 
              src={topData.hero_image.url} 
              alt="Appare! 全員集合写真" 
              fill 
              className="object-cover" 
              priority 
            />
          )}
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">世界を明るく照らす、9色の光。</h2>
        <p className="max-w-2xl mx-auto text-xl font-bold opacity-80 leading-relaxed text-white">
          このサイトは、Appare!の魅力をアーカイブし、ファンと共に歩む非公式スペースです。
        </p>
      </section>

      {/* MEMBERSセクション */}
      <section id="members" className="max-w-7xl mx-auto py-24 px-5">
        <h2 className="text-5xl font-black mb-16 border-l-8 border-black pl-6 uppercase tracking-tighter">Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/members" className="group relative block overflow-hidden border-[6px] border-black bg-black p-12 shadow-[15px_15px_0px_0px_rgba(255,255,0,1)] transition-all hover:translate-x-1 hover:-translate-y-1 text-white">
            <h3 className="text-5xl font-black italic tracking-tighter uppercase">View All Members</h3>
            <p className="mt-4 text-yellow-400 font-bold">全メンバーを見る →</p>
          </Link>
        </div>
      </section>

      {/* NEWSセクション */}
      <section id="news" className="bg-gray-100 py-24 px-5 border-y-[6px] border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black mb-16 border-l-8 border-black pl-6 uppercase tracking-tighter">Latest News</h2>
          <div className="space-y-8 text-black">
            {newsData.contents.map((item) => (
              <Link href={`/news/${item.id}`} key={item.id} className="group block border-b-4 border-black pb-6 hover:bg-white transition-colors p-4">
                <p className="text-sm font-black text-gray-500 mb-2">
                  {new Date(item.publishedAt).toLocaleDateString('ja-JP').replace(/\//g, '.')}
                </p>
                <h3 className="text-2xl font-black italic group-hover:text-red-600 transition-colors">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 px-5 bg-white border-t-[10px] border-black text-center text-black">
        <p className="text-2xl font-black tracking-tighter underline decoration-4">© 2026 Appare! UNOFFICIAL</p>
      </footer>
    </main>
  );
}