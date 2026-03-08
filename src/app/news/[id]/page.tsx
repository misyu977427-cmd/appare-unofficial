export const revalidate = 0;

import { client } from "@/lib/microcms";
import Link from "next/link";

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  // ✅ try-catchでエラー時に画面が真っ白になるのを防ぐ
  try {
    const item = await client.get({ endpoint: "news", contentId: params.id });

    return (
      <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link href="/news" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '40px' }}>← BACK TO NEWS LIST</Link>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', fontStyle: 'italic', borderBottom: '8px solid black', paddingBottom: '20px', marginBottom: '40px' }}>
            {item.title}
          </h1>
          <div 
            style={{ lineHeight: '2', fontSize: '1.1rem', fontWeight: 'bold' }}
            dangerouslySetInnerHTML={{ __html: item.content }} 
          />
        </div>
      </main>
    );
  } catch (error) {
    return <main style={{ padding: '40px' }}>記事が見つからないか、下書き状態です。</main>;
  }
}