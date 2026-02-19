import { client } from "@/lib/microcms";
import Image from "next/image";
import Link from "next/link"; // ✅ リンク機能を追加

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
  // ✅ データの並列取得（共同開発者の記事も自動反映）
  const [memberData, newsData] = await Promise.all([
    client.getList<Member>({ 
      endpoint: "members",
      queries: { orders: '-createdAt' } 
    }),
    client.getList<News>({ 
      endpoint: "news",
      queries: { orders: '-date' } 
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

      {/* MAIN VISUAL: 9色の光 & 集合写真枠 */}
      <section className="bg-black text-white py-24 px-5 text-center">
        {/* ⚠️ ここに将来、メンバー全員の集合写真を Image タグで載せます */}
        <div className="max-w-4xl mx-auto mb-10 border-4 border-white aspect-video flex items-center justify-center bg-gray-900 overflow-hidden relative">
           <p className="text-gray-500 italic">ここに集合写真を掲載予定</p>
           {/* 写真がある場合は以下をアンコメントして使用 */}
           {/* <Image src="/all-members.jpg" alt="Appare! 全員" fill className="object-cover" /> */}
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">世界を明るく照らす、9色の光。</h2>
        <p className="max-w-2xl mx-auto text-xl font-bold leading-relaxed opacity-80">
          このサイトは、Appare!の魅力をアーカイブし、ファンと共に歩む非公式スペースです。
        </p>
      </section>

      {/* SNS LINKS: 公式連携 */}
      <section className="py-12 border-b-4 border-black bg-yellow-400">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 font-black text-2xl italic uppercase text-black">
          <a href="https://x.com/official_appare" target="_blank" className="hover:scale-110 transition-transform">X</a>
          <a href="https://www.youtube.com/@AppareOfficial" target="_blank" className="hover:scale-110 transition-transform">YouTube</a>
          <a href="https://www.tiktok.com/@appare_official" target="_blank" className="hover:scale-110 transition-transform">TikTok</a>
          <a href="https://www.instagram.com/official_appare/" target="_blank" className="hover:scale-110 transition-transform">Instagram</a>
        </div>
      </section>

      {/* MEMBERS: メンバー一覧（詳細ページへリンク） */}
      <section id="members" className="max-w-7xl mx-auto py-24 px-5">
        <h2 className="text-5xl font-black mb-16 border-l-8 border-black pl-6 uppercase tracking-tighter text-black">Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-black">
          {members.map((member) => (
            <Link href={`/members/${member.id}`} key={member.id} className="block group">
              <div 
                className="border-[6px] border-black p-10 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center bg-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                style={{ borderColor: member.color }}
              >
                <div className="w-40 h-40 rounded-full mb-8 border-4 border-black overflow-hidden relative bg-gray-100 shadow-inner">
                  {member.image ? (
                    <Image src={member.image.url} alt={member.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full" style={{ backgroundColor: member.color }}></div>
                  )}
                </div>
                <h3 className="text-4xl font-black mb-2">{member.name}</h3>
                <p className="text-sm font-bold text-gray-400 mb-6 tracking-[0.3em] uppercase">{member.name_en}</p>
                <div className="h-1.5 w-12 bg-black mb-6"></div>
                <p className="text-md font-bold italic text-gray-700 leading-relaxed">“{member.catchphrase}”</p>
                <p className="mt-4 text-xs font-black uppercase underline tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View Profile</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEWS: 最新記事（共同開発者の更新を反映） */}
      <section id="news" className="bg-gray-100 py-24 px-5 border-y-[6px] border-black text-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black mb-16 border-l-8 border-black pl-6 uppercase tracking-tighter">Latest News</h2>
          <div className="space-y-8">
            {news.length > 0 ? (
              news.map((item) => (
                <div key={item.id} className="group border-b-4 border-black pb-6 hover:bg-white transition-colors p-4 cursor-pointer">
                  <p className="text-sm font-black text-gray-500 mb-2">
                    {new Date(item.date).toLocaleDateString('ja-JP').replace(/\//g, '.')}
                  </p>
                  <h3 className="text-2xl font-black italic group-hover:text-red-600 transition-colors">{item.title}</h3>
                </div>
              ))
            ) : (
              <p className="text-center font-bold text-gray-400 italic py-10">現在、新しいお知らせはありません。</p>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER: ご注意・著作権 */}
      <footer className="py-20 px-5 bg-white border-t-[10px] border-black text-xs font-bold leading-relaxed text-black">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-sm mb-3 underline underline-offset-4 decoration-2 italic uppercase">【Information】</p>
              <p className="text-gray-600">当サイトのデータはファンによる手作業で収集しているため、公式発表とのタイムラグが生じる場合があります。最新情報は必ず公式サイトを併せてご確認ください。</p>
            </div>
            <div>
              <p className="text-sm mb-3 underline underline-offset-4 decoration-2 italic uppercase">【Copyright】</p>
              <p className="text-gray-600">本サイトはファンコミュニティの活性化を目的としており、肖像権等の侵害を意図するものではありません。権利者様よりご連絡をいただいた場合は、迅速に対応いたします。</p>
            </div>
          </div>
          <div className="pt-10 border-t-2 border-gray-200 text-center">
            <p className="mb-4 italic text-gray-500 uppercase tracking-widest text-black">This is an unofficial fan site. 本サイトは有志による非公式ファンサイトです。</p>
            <p className="text-2xl font-black tracking-tighter underline decoration-4 text-black">© 2026 Appare! UNOFFICIAL</p>
          </div>
        </div>
      </footer>
    </main>
  );
}