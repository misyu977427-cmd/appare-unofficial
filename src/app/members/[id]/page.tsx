import { client } from "@/lib/microcms";
import Link from "next/link";

export default async function MemberDetailPage({ params }: { params: { id: string } }) {
  // ✅ 修正ポイント：特定のIDのデータだけを取得する
  const member = await client.get({ endpoint: "members", contentId: params.id });

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <Link href="/members" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '40px' }}>
        ← BACK TO LIST
      </Link>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ border: '8px solid black', backgroundColor: '#eee', marginBottom: '40px' }}>
          {member.image && <img src={member.image.url} alt={member.name} style={{ width: '100%', height: 'auto', display: 'block' }} />}
        </div>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', fontStyle: 'italic', margin: '0 0 10px 0' }}>{member.name}</h1>
        <p style={{ display: 'inline-block', backgroundColor: 'black', color: 'white', padding: '5px 20px', fontWeight: '900', marginBottom: '40px' }}>
          COLOR: {member.color}
        </p>
        <div style={{ textAlign: 'left', border: '4px solid black', padding: '30px', fontWeight: 'bold', lineHeight: '1.8' }}>
          <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{member.introduction || "自己紹介文が未設定です。"}</p>
        </div>
      </div>
    </main>
  );
}