export const revalidate = 0;

import { client } from "@/lib/microcms";
import Image from "next/image";
import Link from "next/link";

// 型定義
type Member = {
  id: string;
  name: string;
  color: string;
};

type News = {
  id: string;
  title: string;
  date: string;
};

export default async function Home() {
  const [memberData, newsData] = await Promise.all([
    client.getList<Member>({ endpoint: "members", queries: { limit: 1 } }), // 入り口用なので軽量に取得
    client.getList<News>({ endpoint: "news", queries: { orders: '-createdAt', limit: 3 } }),
  ]);

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 text-black">
      {/* HEADER */}
      <header className="py-6 px-5 border-b-8 border-black sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-black">
          <h1 className="text-3xl font-black italic tracking-tighter">Appare! UNOFFICIAL</h1>
          <nav className="hidden md:flex gap-6 font-black text-sm uppercase">
            <Link href="/" className="hover:underline underline-offset-4">Home</Link>
            <Link href="#members" className="hover:underline underline-offset-4">Members</Link>
            <Link href="#news" className="hover:underline underline-offset-4">News</Link>
          </nav>
        </div>
      </header>

      {/* MAIN VISUAL: 集合写真を反映 */}
      <section className="bg-black text-white py-24 px-5 text-center">
        <div className="max-w-4xl mx-auto mb-10 border-4 border-white aspect-video relative overflow-hidden bg-gray-900 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.3)]">
          {/* ✅ public/all-members.jpg を呼び出し */}
          <Image 
            src="/all-members.jpg" 
            alt="Appare! 全員集合写真" 
            fill 
            className="object-cover"
            priority 
          />
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">世界を明るく照らす、9色の光。</h2>
        <p className="max-w-2xl mx-auto text-xl font-bold opacity-80 leading-relaxed">
          このサイトは、Appare!の魅力をアーカイブし、ファンと共に歩む非公式スペースです。
        </p>
      </section>

      {/* SNS LINKS */}
      <section className="py-12 border-b-4 border-black bg-yellow-400 text-black">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 font-black text-2xl italic uppercase">
          <a href="https://x.com/official_appare" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://www.youtube.com/@AppareOfficial" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://www.tiktok.com/@appare_official" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://www.instagram.com/official_appare/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </section>

      {/* MEMBERS: 3段階の第1段階 (入口) */}
      <section id="members" className="max-w-7xl mx-auto py-24 px-5 text-black">
        <h2 className="text-5xl font-black mb-16 border-l-8 border-black pl-6 uppercase tracking-tighter">Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
          <Link href="/members" className="group relative block overflow-hidden border-[6px] border-black bg-black p-12 shadow-[15px_15px_0px_0px_rgba(255,255,0,1)] transition-all hover:translate-x-1 hover:-translate-y-1">
            <h3 className="text-5xl font-black italic text-white tracking-tighter">VIEW ALL<br />MEMBERS</h3>
            <p className="mt-4 text-yellow-400 font-bold uppercase tracking-widest">全メンバーを見る →</p>
          </Link>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/members?tag=既存メンバー" className="border-4 border-black p-6 flex items-center justify-center font-black text-xl hover:bg-black hover:text-white transition-colors">#既存メンバー</Link>
            <Link href="/members?tag=新メンバー" className="border-4 border-black p-6 flex items-center justify-center font-black text-xl hover:bg-black hover:text-white transition-colors">#新メンバー</Link>
          </div>
        </div>
      </section>

      {/* NEWS: 最新3件表示 */}
      <section id="news" className="bg-gray-100 py-24 px-5 border-y-[6px] border-black text-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black mb-16 border-l-8 border-black pl-6 uppercase tracking-tighter">Latest News</h2>
          <div className="space-y-8">
            {newsData.contents.map((item) => (
              <Link href={`/news/${item.id}`} key={item.id} className="group block border-b-4 border-black pb-6 hover:bg-white transition-colors p-4">
                <p className="text-sm font-black text-gray-500 mb-2">
                  {new Date(item.date).toLocaleDateString('ja-JP').replace(/\//g, '.')}
                </p>
                <h3 className="text-2xl font-black italic group-hover:text-red-600 transition-colors">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-5 bg-white border-t-[10px] border-black text-xs font-bold leading-relaxed text-black">
        <div className="max-w-4xl mx-auto pt-10 border-t-2 border-gray-200 text-center text-black">
          <p className="mb-4 italic text-gray-500 uppercase tracking-widest">This is an unofficial fan site.</p>
          <p className="text-2xl font-black tracking-tighter underline decoration-4 text-black">© 2026 Appare! UNOFFICIAL</p>
        </div>
      </footer>
    </main>
  );
}