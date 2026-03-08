export const revalidate = 0;

import { client } from "@/lib/microcms";
import { notFound } from "next/navigation";
import Link from "next/link";

// ✅ params を Promise として受け取るように変更 (Next.js 15仕様)
export default async function NewsDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params; // ✅ ここで await するのが最重要ポイント！
  const id = params.id;

  let item;
  try {
    item = await client.get({
      endpoint: "news",
      contentId: id,
    });
  } catch (error) {
    return notFound();
  }

  if (!item || !item.title) return notFound();

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/news" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '40px' }}>
          ← BACK TO NEWS LIST
        </Link>
        
        {/* デバッグ用（表示されたら消してOK） */}
        <div style={{ backgroundColor: '#ff0', padding: '10px', fontSize: '0.8rem', marginBottom: '20px', border: '2px solid black' }}>
          DEBUG: ID={id} は正常に取得されました ✅
        </div>

        <p style={{ color: '#6b7280', fontWeight: '900', marginBottom: '10px' }}>
          {new Date(item.publishedAt).toLocaleDateString('ja-JP').replace(/\//g, '.')}
        </p>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', fontStyle: 'italic', borderBottom: '8px solid black', paddingBottom: '20px', marginBottom: '40px', textTransform: 'uppercase' }}>
          {item.title}
        </h1>
        
        {/* ✅ microCMSのフィールドID 'content' を参照 */}
        <div 
          style={{ lineHeight: '2', fontSize: '1.1rem', fontWeight: 'bold' }}
          dangerouslySetInnerHTML={{ __html: item.content || item.body }} 
        />
      </div>
    </main>
  );
}