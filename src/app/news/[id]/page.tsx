export const revalidate = 0; // ✅ キャッシュを無効化（常に最新を取得）

import { client } from "@/lib/microcms";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  try {
    const item = await client.get({
      endpoint: "news",
      contentId: params.id,
    });

    // ✅ データがない場合は404を表示（真っ白画面エラーを防ぐ）
    if (!item) return notFound();

    return (
      <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link href="/news" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '40px' }}>
            ← BACK TO NEWS LIST
          </Link>
          <p style={{ color: '#6b7280', fontWeight: '900', marginBottom: '10px' }}>
            {new Date(item.publishedAt).toLocaleDateString('ja-JP').replace(/\//g, '.')}
          </p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', fontStyle: 'italic', borderBottom: '8px solid black', paddingBottom: '20px', marginBottom: '40px' }}>
            {item.title}
          </h1>
          {/* ✅ フィールドID 'content' を確実に参照 */}
          <div 
            style={{ lineHeight: '2', fontSize: '1.1rem', fontWeight: 'bold' }}
            dangerouslySetInnerHTML={{ __html: item.content }} 
          />
        </div>
      </main>
    );
  } catch (error) {
    // APIエラー時も真っ白にせず404を返す
    return notFound();
  }
}