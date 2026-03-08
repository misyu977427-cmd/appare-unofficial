import { client } from "@/lib/microcms";
import Link from "next/link";

export default async function MemberDetailPage({ params }: { params: { id: string } }) {
  const member = await client.get({ endpoint: "members", contentId: params.id });

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <Link href="/members" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '40px' }}>
        ← BACK TO MEMBERS
      </Link>

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        {/* 写真 */}
        <div style={{ border: '8px solid black', backgroundColor: '#eee', marginBottom: '40px' }}>
          {member.image && <img src={member.image.url} alt={member.name} style={{ width: '100%', height: 'auto', display: 'block' }} />}
        </div>

        <h1 style={{ fontSize: '4rem', fontWeight: '900', fontStyle: 'italic', margin: '0 0 10px 0' }}>{member.name}</h1>
        
        {/* 詳細プロフィール項目 */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ backgroundColor: 'black', color: 'white', padding: '5px 20px', fontWeight: '900' }}>COLOR: {member.color}</span>
          {member.birthday && <span style={{ border: '3px solid black', padding: '5px 15px', fontWeight: '900' }}>BIRTH: {member.birthday}</span>}
          {member.hometown && <span style={{ border: '3px solid black', padding: '5px 15px', fontWeight: '900' }}>FROM: {member.hometown}</span>}
        </div>

        {/* 自己紹介エリア */}
        <div style={{ textAlign: 'left', border: '4px solid black', padding: '30px', fontWeight: 'bold', lineHeight: '1.8', backgroundColor: '#fafafa' }}>
          <h2 style={{ fontSize: '1.2rem', borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '20px' }}>INTRODUCTION</h2>
          <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{member.introduction || "紹介文を準備中です。"}</p>
          
          {member.twitter_id && (
            <a href={`https://twitter.com/${member.twitter_id}`} target="_blank" style={{ display: 'block', marginTop: '30px', color: '#1DA1F2', textDecoration: 'none' }}>
              𝕏 Official Account →
            </a>
          )}
        </div>
      </div>
    </main>
  );
}