export const revalidate = 0;

import { client } from "@/lib/microcms";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  let item;
  
  try {
    // ✅ microCMSからデータを取得
    item = await client.get({
      endpoint: "news",
      contentId: params.id,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return notFound(); // ⚠️ 取得失敗時は404へ飛ばしてクラッシュを防ぐ
  }

  // ✅ itemが空の場合も404へ
  if (!item) return notFound();

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/news" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '40px' }}>
          ← BACK TO NEWS LIST
        </Link>
        
        {/* --- デバッグエリア: 本番反映後に文字が出ていれば疎通成功 --- */}
        <div style={{ backgroundColor: '#ff0', padding: '10px', fontSize: '0.8rem', marginBottom: '20px', border: '2px solid black' }}>
          DEBUG: ID={params.id} / TITLE={item.title ? "OK" : "EMPTY"}
        </div>

        <p style={{ color: '#6b7280', fontWeight: '900', marginBottom: '10px' }}>
          {new Date(item.publishedAt).toLocaleDateString('ja-JP').replace(/\//g, '.')}
        </p>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', fontStyle: 'italic', borderBottom: '8px solid black', paddingBottom: '20px', marginBottom: '40px', textTransform: 'uppercase' }}>
          {item.title}
        </h1>
        
        {/* ✅ microCMSのフィールドID 'content' を参照 */}
        {item.content ? (
          <div 
            style={{ lineHeight: '2', fontSize: '1.1rem', fontWeight: 'bold' }}
            dangerouslySetInnerHTML={{ __html: item.content }} 
          />
        ) : (
          <p style={{ color: 'red' }}>⚠️ 'content' フィールドにデータがありません。</p>
        )}
      </div>
    </main>
  );
}