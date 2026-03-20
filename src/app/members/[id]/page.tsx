// src/app/members/[id]/page.tsx
export const revalidate = 0; // 常に最新データを取得

import { client } from "@/lib/microcms";
import { notFound } from "next/navigation";
import Link from "next/link";

// ✅ メンバーカラーとカラーコードの対応表（microCMSの登録名と完全一致させる）
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
  // ✅ Next.js 15仕様: params を Promise として受け取り await する
  const params = await props.params;
  const id = params.id;

  let member;
  try {
    member = await client.get({
      endpoint: "members",
      contentId: id,
    });
  } catch (error) {
    return notFound(); // 取得失敗時は404へ
  }

  if (!member) return notFound();

  // ✅ 担当カラーを取得（見つからない場合は黒をデフォルトに）
  const memberColor = COLOR_MAP[member.color] || "#000";

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      {/* 戻るボタン */}
      <Link href="/members" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '40px' }}>
        ← BACK TO LIST
      </Link>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* 大きな丸いアイコンエリア：枠線に担当カラーを適用 */}
        <div style={{ 
          width: '250px', 
          height: '250px', 
          borderRadius: '50%', 
          overflow: 'hidden', 
          border: `8px solid ${memberColor}`, 
          margin: '0 auto 40px', 
          backgroundColor: '#eee', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          {member.image ? (
            <img 
              src={member.image.url} 
              alt={member.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          ) : (
            <div style={{ fontWeight: '900', color: '#999' }}>NO IMAGE</div>
          )}
        </div>

        {/* メンバー名：文字色に担当カラーを適用 */}
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: '900', 
          fontStyle: 'italic', 
          margin: '0 0 20px 0', 
          textTransform: 'uppercase',
          color: memberColor 
        }}>
          {member.name}
        </h1>
        
        {/* カラーバナー：背景色に担当カラー、文字色は白（白担当の場合は黒） */}
        <div style={{ 
          backgroundColor: memberColor, 
          color: memberColor === "#ffffff" ? "black" : "white", 
          padding: '15px 40px', 
          fontWeight: '900', 
          fontSize: '1.2rem', 
          margin: '0 0 40px 0', 
          display: 'inline-block', 
          border: member.color === "白" ? "2px solid black" : "none" 
        }}>
          COLOR: {member.color}
        </div>

        {/* 紹介文エリア：枠線に担当カラーを適用 */}
        <div style={{ 
          textAlign: 'left', 
          border: `4px solid ${memberColor}`, 
          padding: '30px', 
          fontWeight: 'bold', 
          lineHeight: '2' 
        }}>
          {/* 見出し（オプション） */}
          <h2 style={{ fontSize: '1.2rem', borderBottom: `2px solid ${memberColor}`, paddingBottom: '10px', marginBottom: '20px' }}>
            INTRODUCTION
          </h2>
          {/* microCMSのリッチエディタ内容を反映 */}
          <div dangerouslySetInnerHTML={{ __html: member.content || "紹介文は未設定です。" }} />
        </div>
      </div>
    </main>
  );
}