export const revalidate = 0;

import { client } from "@/lib/microcms";
import Link from "next/link";

type TopSetting = { hero_image: { url: string }; };
type Member = { id: string; name: string; color: string; };
type News = { id: string; title: string; publishedAt: string; };

export default async function Home() {
  const [topData, memberData, newsData] = await Promise.all([
    client.get<TopSetting>({ endpoint: "top" }), 
    client.getList<Member>({ endpoint: "members", queries: { limit: 10 } }),
    client.getList<News>({ endpoint: "news", queries: { orders: '-publishedAt', limit: 3 } }),
  ]);

  // ✅ 高画質化設定（microCMSの画像URLにパラメータを付与）
  const highResImageUrl = `${topData.hero_image.url}?w=1200&q=90&fm=webp`;

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* HEADER */}
      <header style={{ padding: '24px', borderBottom: '8px solid black', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 50 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '900', fontStyle: 'italic', margin: 0, letterSpacing: '-2px' }}>Appare! UNOFFICIAL</h1>
      </header>

      {/* MAIN VISUAL (高画質版) */}
      <section style={{ backgroundColor: 'black', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto 40px', border: '5px solid white', backgroundColor: '#111', boxShadow: '15px 15px 0px 0px rgba(255,255,255,0.2)' }}>
          {topData.hero_image && (
            <img 
              src={highResImageUrl} 
              alt="Appare! 全員集合写真" 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
          )}
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', fontStyle: 'italic', marginBottom: '20px', textTransform: 'uppercase' }}>世界を明るく照らす、9色の光。</h2>
      </section>

      {/* MEMBERS SECTION (復旧) */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '900', borderLeft: '10px solid black', paddingLeft: '20px', marginBottom: '60px', textTransform: 'uppercase' }}>Members</h2>
        <Link href="/members" style={{ textDecoration: 'none' }}>
          <div style={{ backgroundColor: 'black', color: 'white', padding: '60px', border: '6px solid black', boxShadow: '15px 15px 0px 0px #ffff00', transition: '0.2s' }}>
            <h3 style={{ fontSize: '3rem', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>VIEW ALL MEMBERS</h3>
            <p style={{ color: '#ffff00', fontWeight: 'bold', marginTop: '20px' }}>全メンバーを見る →</p>
          </div>
        </Link>
      </section>

      {/* NEWS SECTION (復旧) */}
      <section style={{ backgroundColor: '#f3f4f6', padding: '100px 20px', borderTop: '6px solid black', borderBottom: '6px solid black' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', borderLeft: '10px solid black', paddingLeft: '20px', marginBottom: '60px', textTransform: 'uppercase' }}>Latest News</h2>
          {newsData.contents.map((item) => (
            <Link href={`/news/${item.id}`} key={item.id} style={{ textDecoration: 'none', color: 'black' }}>
              <div style={{ borderBottom: '4px solid black', padding: '30px 0', marginBottom: '10px' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: '900', color: '#6b7280', marginBottom: '10px' }}>
                  {new Date(item.publishedAt).toLocaleDateString('ja-JP').replace(/\//g, '.')}
                </p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER (復旧) */}
      <footer style={{ padding: '80px 20px', backgroundColor: 'white', textAlign: 'center' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: '900', textDecoration: 'underline', textDecorationThickness: '4px' }}>© 2026 Appare! UNOFFICIAL</p>
      </footer>
    </main>
  );
}