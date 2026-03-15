// src/app/members/page.tsx
import { client } from "@/lib/microcms";
import Link from "next/link";

export const revalidate = 0; // ✅ キャッシュを無効化

export default async function MembersPage() {
  const data = await client.get({ endpoint: "members" });

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      {/* タイトル：MEMBERS */}
      <h1 style={{ fontSize: '2.5rem', fontWeight: '900', fontStyle: 'italic', borderBottom: '8px solid black', paddingBottom: '20px', marginBottom: '40px' }}>
        MEMBERS
      </h1>

      {/* グリッドレイアウト */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {data.contents.map((member: any) => (
          <Link href={`/members/${member.id}`} key={member.id} style={{ textDecoration: 'none' }}>
            {/* メンバーカード：黒背景 */}
            <div style={{ backgroundColor: 'black', color: 'white', border: '4px solid black', display: 'flex', alignItems: 'center', padding: '15px', position: 'relative' }}>
              
              {/* 丸いアイコンエリア */}
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '4px solid white', marginRight: '20px', flexShrink: 0 }}>
                {member.image ? (
                  <img src={member.image.url} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ textAlign: 'center', paddingTop: '30px', color: 'white' }}>NO IMAGE</div>
                )}
              </div>

              {/* 名前とカラー */}
              <div>
                <p style={{ fontSize: '1rem', fontWeight: '900', fontStyle: 'italic', margin: '0 0 5px 0' }}>
                  {member.name.toUpperCase()}
                </p>
                <p style={{ fontSize: '0.8rem', fontWeight: '900', margin: 0 }}>
                  ● COLOR: {member.color}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}