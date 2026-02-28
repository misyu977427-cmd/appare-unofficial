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

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={{ padding: '20px', borderBottom: '5px solid black', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ fontWeight: '900', fontStyle: 'italic' }}>Appare! UNOFFICIAL</h1>
      </header>

      {/* ✅ 別の方法：標準のimgタグとStyle属性で強制表示 */}
      <section style={{ backgroundColor: 'black', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto 40px', border: '4px solid white', backgroundColor: '#111', lineHeight: 0 }}>
          {topData.hero_image && (
            <img 
              src={topData.hero_image.url} 
              alt="Appare! 全員集合写真" 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
          )}
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '20px' }}>世界を明るく照らす、9色の光。</h2>
      </section>

      {/* NEWS（ここも直書き） */}
      <section style={{ padding: '60px 20px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', borderLeft: '8px solid black', paddingLeft: '15px' }}>NEWS</h2>
        {newsData.contents.map((item) => (
          <div key={item.id} style={{ padding: '20px 0', borderBottom: '2px solid black' }}>
            <Link href={`/news/${item.id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
              {item.title}
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}