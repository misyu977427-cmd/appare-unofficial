export const revalidate = 0;

import { client } from "@/lib/microcms";
import { notFound } from "next/navigation";
import Link from "next/link";

// ✅ メンバーカラーとカラーコードの対応表（全メンバー分を追加）
const COLOR_MAP: Record<string, string> = {
  "桃色": "#ff69b4", // 橋本あみ
  "赤色": "#ff0000", // 朝比奈れい
  "青色": "#0000ff", // 藍井すず
  "水色": "#87ceeb", // 坂本りさ
  "オレンジ": "#ffa500", // 森川なつ
  "紫": "#800080", // 北野あむ
  "黄": "#ffff00", // 七瀬れあ
  "白": "#ffffff", // 藤宮めい
  "ミントグリーン": "#98fb98", // 永堀ゆめ
};

export default async function MemberDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  let member;
  try {
    member = await client.get({ endpoint: "members", contentId: id });
  } catch (error) {
    return notFound();
  }

  if (!member) return notFound();

  // ✅ メンバーカラーに対応するコードを取得（見つからない場合はグレー）
  const bannerColor = COLOR_MAP[member.color] || "#ccc";

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <Link href="/members" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '40px' }}>
        ← BACK TO LIST
      </Link>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        {/* 大きな丸いアイコンエリア */}
        <div style={{ width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden', border: '8px solid black', margin: '0 auto 40px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {member.image ? (
            <img src={member.image.url} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ fontWeight: '900', color: '#999' }}>NO IMAGE</div>
          )}
        </div>

        <h1 style={{ fontSize: '3rem', fontWeight: '900', fontStyle: 'italic', margin: '0 0 20px 0', textTransform: 'uppercase' }}>
          {member.name}
        </h1>
        
        {/* ✅ メンバーカラーのバナー（<div>で開き、<div>で閉じる） */}
        <div style={{ backgroundColor: bannerColor, color: bannerColor === "#ffffff" ? "black" : "white", padding: '15px 40px', fontWeight: '900', fontSize: '1.2rem', margin: '0 0 40px 0', display: 'inline-block', border: member.color === "白" ? "2px solid black" : "none" }}>
          COLOR: {member.color}
        </div>

        {/* 紹介文エリア：灰色背景 */}
        <div style={{ textAlign: 'left', border: '4px solid black', padding: '30px', fontWeight: 'bold', lineHeight: '2' }}>
          <div dangerouslySetInnerHTML={{ __html: member.content || "紹介文は未設定です。" }} />
        </div>
      </div> {/* ✅ maxWidth の div を閉じるタグが画像では足りていませんでした */}
    </main>
  );
}