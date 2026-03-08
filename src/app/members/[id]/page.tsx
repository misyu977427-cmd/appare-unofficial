export const revalidate = 0; // ✅ 常に最新データを取得

import { client } from "@/lib/microcms";
import { notFound } from "next/navigation";
import Link from "next/link";

// ✅ params を Promise として受け取る (Next.js 15仕様)
export default async function MemberDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params; // ✅ ここで ID を取得
  const id = params.id;

  let member;
  try {
    member = await client.get({
      endpoint: "members",
      contentId: id,
    });
  } catch (error) {
    return notFound(); // ⚠️ 取得失敗時は404へ
  }

  if (!member) return notFound();

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <Link href="/members" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '40px' }}>
        ← BACK TO LIST
      </Link>

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ border: '8px solid black', marginBottom: '40px' }}>
          {member.image && <img src={member.image.url} alt={member.name} style={{ width: '100%', height: 'auto', display: 'block' }} />}
        </div>
        
        <h1 style={{ fontSize: '4rem', fontWeight: '900', fontStyle: 'italic', margin: '0 0 10px 0' }}>{member.name}</h1>
        
        <div style={{ marginBottom: '40px', fontWeight: '900' }}>
          <span style={{ backgroundColor: 'black', color: 'white', padding: '5px 20px', marginRight: '10px' }}>COLOR: {member.color}</span>
          {member.birthday && <span>BIRTH: {new Date(member.birthday).toLocaleDateString('ja-JP')}</span>}
        </div>

        <div style={{ textAlign: 'left', border: '4px solid black', padding: '30px', fontWeight: 'bold', lineHeight: '1.8' }}>
          <h2 style={{ fontSize: '1.2rem', borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '20px' }}>INTRODUCTION</h2>
          {/* ✅ 重要: スキーマ通り 'content' を参照 */}
          <div dangerouslySetInnerHTML={{ __html: member.content || "紹介文は未設定です。" }} />
        </div>
      </div>
    </main>
  );
}