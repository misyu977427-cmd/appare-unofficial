export const revalidate = 0; // ✅ 1. キャッシュを無効化し、常に最新記事を同期する

import { client } from "@/lib/microcms";
import Image from "next/image";
import Link from "next/link";

// 型定義
type Member = {
  id: string;
  name: string;
  name_en: string;
  color: string;
  catchphrase: string;
  image?: { url: string };
};

type News = {
  id: string;
  title: string;
  date: string;
  content: string;
};

export default async function Home() {
  const [memberData, newsData] = await Promise.all([
    client.getList<Member>({ 
      endpoint: "members",
      queries: { orders: '-createdAt' } 
    }),
    client.getList<News>({ 
      endpoint: "news",
      queries: { orders: '-createdAt', limit: 3 } // ⚠️ 'date' フィールドがない場合は 'createdAt' を使用
    }),
  ]);

  const members = memberData.contents;
  const news = newsData.contents;

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* HEADER: ナビゲーション */}
      <header className="py-6 px-5 border-b-8 border-black sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black italic tracking-tighter">Appare! UNOFFICIAL</h1>
          </div>
          <nav className="hidden md:flex gap-6 font-black text-sm uppercase">
            <a href="#" className="hover:underline underline-offset-4 text-black">Home</a>
            <a href="#members" className="hover:underline underline-offset-4 text-black">Members</a>
            <a href="#news" className="hover:underline underline-offset-4 text-black">News</a>
          </nav>
        </div>
      </header>

      {/* MAIN VISUAL: 集合写真枠 */}
      <section className="bg-black text-white py-24 px-5 text-center">
        <div className="max-w-4xl mx-auto mb-10 border-4 border-white aspect-video flex items-center justify-center bg-gray-900 overflow-hidden relative">
           <p className="text-gray-500 italic">ここに集合写真を掲載予定</p>
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">世界を明るく照らす、9色の光。</h2>
        <p className="max-w-2xl mx-auto text-xl font-bold leading-relaxed opacity-80">
          このサイトは、Appare!の魅力をアーカイブし、ファンと共に歩む非公式スペースです。
        </p>
      </section>

      {/* SNS LINKS */}
      <section className="py-12 border-b-4 border-black bg-yellow-400">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 font-black text-2xl italic uppercase text-black">
          <a href="https://x.com/official_appare" target="_blank">X</a>
          <a href="https://www.youtube.com/@AppareOfficial" target="_blank">YouTube</a>
          <a href="https://www.tiktok.com/@appare_official" target="_blank">TikTok</a>
          <a href="https://www.instagram.com/official_appare/" target="_blank">Instagram</a>
        </div>
      </section>

      {/* MEMBERS Stage 1: カテゴリ・全員への入り口（✅ 重複を削除して修正） */}
      <section id="members" className="max-w-7xl mx-auto py-24 px-5">
        <h2 className="text-5xl font-black mb-16 border-l-8 border-black pl-6 uppercase tracking-tighter text-black">Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/members" className="group relative block overflow-hidden border-[6px] border-black bg-black p-12 shadow-[15px_15px_0px_0px_rgba(255,255,0,1)] transition-all hover:translate-x-1 hover:-translate-y-1">
            <div className="relative z-10">
              <h3 className="text-5xl font-black italic text-white tracking-tighter">VIEW ALL<br />MEMBERS</h3>
              <p className="mt-4 text-yellow-400 font-bold uppercase tracking-widest">全メンバーを見る →</p>
            </div>
          </Link>
        </div>
      </section>

      {/* NEWS: 最新記事（✅ 3件制限 ＆ 詳細へのリンクを追加） */}
      <section id="news" className="bg-gray-100 py-24 px-5 border-y-[6px] border-black text-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black mb-16 border-l-8 border-black pl-6 uppercase tracking-tighter">Latest News</h2>
          <div className="space-y-8">
            {news.length > 0 ? (
              news.map((item) => (
                <Link href={`/news/${item.id}`} key={item.id} target="_blank" className="group block border-b-4 border-black pb-6 hover:bg-white transition-colors p-4 cursor-pointer">
                  <p className="text-sm font-black text-gray-500 mb-2">
                    {new Date(item.date || (item as any).createdAt).toLocaleDateString('ja-JP').replace(/\//g, '.')}
                  </p>
                  <h3 className="text-2xl font-black italic group-hover:text-red-600 transition-colors">{item.title}</h3>
                </Link>
              ))
            ) : (
              <p className="text-center font-bold text-gray-400 italic py-10">現在、新しいお知らせはありません。</p>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-5 bg-white border-t-[10px] border-black text-xs font-bold leading-relaxed text-black">
        <div className="max-w-4xl mx-auto pt-10 border-t-2 border-gray-200 text-center">
          <p className="mb-4 italic text-gray-500 uppercase tracking-widest text-black">This is an unofficial fan site. 本サイトは有志による非公式ファンサイトです。</p>
          <p className="text-2xl font-black tracking-tighter underline decoration-4 text-black">© 2026 Appare! UNOFFICIAL</p>
        </div>
      </footer>
    </main>
  );
}