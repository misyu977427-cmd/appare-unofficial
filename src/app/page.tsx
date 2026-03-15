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

  const highResImageUrl = `${topData.hero_image.url}?w=1200&q=90&fm=webp`;

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* HEADER: 「概要」リンクを追加 */}
      <header style={{ padding: '24px', borderBottom: '8px solid black', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 50 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '900', fontStyle: 'italic', margin: 0, letterSpacing: '-2px' }}>Appare! UNOFFICIAL</h1>
      </header>

      {/* MAIN VISUAL */}
      <section style={{ backgroundColor: 'black', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto 40px', border: '5px solid white', backgroundColor: '#111', boxShadow: '15px 15px 0px 0px rgba(255,255,255,0.2)' }}>
          {topData.hero_image && (
            <img src={highResImageUrl} alt="Appare! 全員集合写真" style={{ width: '100%', height: 'auto', display: 'block' }} />
          )}
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', fontStyle: 'italic', marginBottom: '20px', textTransform: 'uppercase' }}>大志を抱けよ yesアイドル</h2>
      </section>

      {/* ABOUT SECTION: 概要と公式リンクを追加 */}
<section id="about" style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 20px', borderBottom: '4px solid black' }}>
  <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '20px' }}>当サイトの概要</h2>
  <p style={{ fontWeight: 'bold', lineHeight: '1.8', marginBottom: '30px' }}>
    本サイトは、9人組女性アイドルグループ Appare!の活動をアーカイブし、その魅力をより多くのファンと共有することを目的とした非公式ファンサイトです!<br />
    ライブレポート、メンバー紹介、最新ニュースなど、ファン目線での情報を集約しています。現在、過去セトリ検索機能作成中！！
  </p>

  {/* ✅ 公式リンク集を追加 */}
  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
    {[
      { label: 'OFFICIAL HP', url: 'https://appare-official.jp/' },
      { label: 'X (Twitter)', url: 'https://x.com/official_appare' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@official_appare' },
    ].map((link) => (
      <a 
        key={link.label}
        href={link.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ 
          backgroundColor: 'black', 
          color: 'white', 
          padding: '10px 20px', 
          fontSize: '0.8rem', 
          fontWeight: '900', 
          textDecoration: 'none', 
          border: '2px solid black' 
        }}
      >
        {link.label} ↗
      </a>
    ))}
  </div>
</section>

      {/* MEMBERS SECTION */}
      <section id="members" style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '900', borderLeft: '10px solid black', paddingLeft: '20px', marginBottom: '60px', textTransform: 'uppercase' }}>Members</h2>
        <Link href="/members" style={{ textDecoration: 'none' }}>
          <div style={{ backgroundColor: 'black', color: 'white', padding: '60px', border: '6px solid black', boxShadow: '15px 15px 0px 0px #ffff00' }}>
            <h3 style={{ fontSize: '3rem', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>VIEW ALL MEMBERS</h3>
            <p style={{ color: '#ffff00', fontWeight: 'bold', marginTop: '20px' }}>全メンバーを見る →</p>
          </div>
        </Link>
      </section>

     {/* NEWS SECTION */}
      <section id="news" style={{ backgroundColor: '#f3f4f6', padding: '100px 20px', borderTop: '6px solid black', borderBottom: '6px solid black' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', borderLeft: '10px solid black', paddingLeft: '20px', marginBottom: '60px', textTransform: 'uppercase' }}>Latest News</h2>
          
          {/* ✅ ここから記事のループ */}
          {newsData.contents.map((item) => (
            <Link href={`/news/${item.id}`} key={item.id} style={{ textDecoration: 'none', color: 'black' }}>
              <div style={{ borderBottom: '4px solid black', padding: '30px 0' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: '900', color: '#6b7280' }}>
                  {new Date(item.publishedAt).toLocaleDateString('ja-JP').replace(/\//g, '.')}
                </p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>{item.title}</h3>
              </div>
            </Link>
          ))}
          {/* ✅ ループはここまで */}

          {/* ✅ ボタンをループの外に配置 */}
          <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <Link href="/news" style={{ display: 'inline-block', backgroundColor: 'black', color: 'white', padding: '15px 40px', fontWeight: '900', textDecoration: 'none', border: '4px solid black', boxShadow: '8px 8px 0px 0px #000' }}>
              VIEW ALL NEWS →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER: 著作権免責事項と運営Xを追加 */}
<footer style={{ padding: '80px 20px', backgroundColor: 'white', borderTop: '10px solid black' }}>
  <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', fontSize: '0.8rem', fontWeight: 'bold', lineHeight: '1.6' }}>
    <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>【著作権について】</p>
    <p>
      当サイトは、ファンの皆様に楽しんでいただくことを目的としており、著作権や肖像権の侵害を意図したものではございません。 <br />
      サイト内で使用されている画像・テキストなどの権利は、それぞれの著作権者様に帰属しております。 <br />
      権利者様や関係者の方々にご迷惑をおかけしないよう細心の注意を払っておりますが、万が一問題がございましたら、以下の公式Xよりご連絡をいただければ迅速に対応させていただきます。
    </p>
    
    {/* ✅ 運営用Xへのリンクを追加 */}
    <p style={{ marginTop: '20px' }}>
      お問い合わせ・運営へのご連絡：
      <a 
        href="https://x.com/hyper4771x" 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ color: 'black', textDecoration: 'underline', marginLeft: '5px' }}
      >
      </a>
    </p>

    <p style={{ marginTop: '40px', textAlign: 'center', fontSize: '1.2rem' }}>Appare!様 非公式ファンサイト</p>
  </div>
</footer>
    </main>
  );
}