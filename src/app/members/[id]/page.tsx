export const revalidate = 0; // ✅ キャッシュを無効化

import { client } from "@/lib/microcms";
import Link from "next/link";

export default async function MemberDetailPage({ params }: { params: { id: string } }) {
  const member = await client.get({ endpoint: "members", contentId: params.id });

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <Link href="/members" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '40px' }}>← BACK TO LIST</Link>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ border: '8px solid black', marginBottom: '40px' }}>
          {member.image && <img src={member.image.url} alt={member.name} style={{ width: '100%', height: 'auto', display: 'block' }} />}
        </div>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', fontStyle: 'italic' }}>{member.name}</h1>
        
        {/* ✅ microCMSで追加したフィールドを表示させる設定 */}
        <div style={{ marginBottom: '40px', fontWeight: '900' }}>
          <span style={{ backgroundColor: 'black', color: 'white', padding: '5px 20px', marginRight: '10px' }}>COLOR: {member.color}</span>
          {member.birthday && <span>BIRTH: {member.birthday}</span>}
        </div>

        <div style={{ textAlign: 'left', border: '4px solid black', padding: '30px', fontWeight: 'bold' }}>
          <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{member.introduction || "紹介文は未設定です。"}</p>
        </div>
      </div>
    </main>
  );
}