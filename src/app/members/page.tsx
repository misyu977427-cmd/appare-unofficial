import { client } from "@/lib/microcms";
import Link from "next/link";

export const revalidate = 0; 

// ✅ 共通のカラーマップ（一覧ページにも定義）
const COLOR_MAP: Record<string, string> = {
  "桃色": "#ff69b4", "赤色": "#ff0000", "青色": "#0000ff",
  "水色": "#87ceeb", "オレンジ": "#ffa500", "紫": "#800080",
  "黄": "#ffd700", "白": "#ffffff", "ミントグリーン": "#98fb98",
};

export default async function MembersPage() {
  const data = await client.get({ endpoint: "members" });

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <Link href="/" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '20px', fontSize: '0.9rem' }}>
        ← BACK TO TOP
      </Link>

      <h1 style={{ fontSize: '2.5rem', fontWeight: '900', fontStyle: 'italic', borderBottom: '8px solid black', paddingBottom: '20px', marginBottom: '40px' }}>
        MEMBERS
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {data.contents.map((member: any) => {
          // ✅ 担当カラーを取得
          const memberColor = COLOR_MAP[member.color] || "#000";
          
          return (
            <Link href={`/members/${member.id}`} key={member.id} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'black', color: 'white', border: '4px solid black', display: 'flex', alignItems: 'center', padding: '15px', position: 'relative' }}>
                {/* ✅ アイコンの枠線をメンバーカラーに */}
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: `4px solid ${memberColor}`, marginRight: '20px', flexShrink: 0 }}>
                  {member.image ? (
                    <img src={member.image.url} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ textAlign: 'center', paddingTop: '30px', color: 'white' }}>NO IMAGE</div>
                  )}
                </div>
                <div>
                  {/* ✅ 名前をメンバーカラーに */}
                  <p style={{ fontSize: '1rem', fontWeight: '900', fontStyle: 'italic', margin: '0 0 5px 0', color: memberColor }}>
                    {member.name.toUpperCase()}
                  </p>
                  {/* ✅ COLORテキストもメンバーカラーに */}
                  <p style={{ fontSize: '0.8rem', fontWeight: '900', margin: 0, color: memberColor }}>
                    ● COLOR: {member.color}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}