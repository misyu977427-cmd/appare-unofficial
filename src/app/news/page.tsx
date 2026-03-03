import { client } from "@/lib/microcms";
import Link from "next/link";

export default async function NewsListPage() {
  // ✅ 最大50件まで取得
  const data = await client.getList({ endpoint: "news", queries: { orders: '-publishedAt', limit: 50 } });

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Link href="/" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '40px' }}>
          ← BACK TO TOP
        </Link>
        
        <h1 style={{ fontSize: '3rem', fontWeight: '900', fontStyle: 'italic', borderBottom: '10px solid black', paddingBottom: '20px', marginBottom: '60px', textTransform: 'uppercase' }}>
          News Archive
        </h1>

        <div style={{ display: 'grid', gap: '20px' }}>
          {data.contents.map((item: any) => (
            <Link href={`/news/${item.id}`} key={item.id} style={{ textDecoration: 'none', color: 'black' }}>
              <div style={{ borderBottom: '4px solid black', padding: '20px 0', transition: '0.2s' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: '900', color: '#6b7280', marginBottom: '5px' }}>
                  {new Date(item.publishedAt).toLocaleDateString('ja-JP').replace(/\//g, '.')}
                </p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}