export const revalidate = 0;

import { client } from "@/lib/microcms";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MemberDetailPage({ params }: { params: { id: string } }) {
  try {
    const member = await client.get({ endpoint: "members", contentId: params.id });

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
          <h1 style={{ fontSize: '4rem', fontWeight: '900', fontStyle: 'italic' }}>{member.name}</h1>
          
          <div style={{ marginBottom: '40px', fontWeight: '900' }}>
            <span style={{ backgroundColor: 'black', color: 'white', padding: '5px 20px', marginRight: '10px' }}>COLOR: {member.color}</span>
            {/* ✅ birthday もID通りに参照 */}
            {member.birthday && <span>BIRTH: {new Date(member.birthday).toLocaleDateString('ja-JP')}</span>}
          </div>

          <div style={{ textAlign: 'left', border: '4px solid black', padding: '30px', fontWeight: 'bold' }}>
            {/* ⚠️ 重要: introduction ではなく content を参照 */}
            <div dangerouslySetInnerHTML={{ __html: member.content || "紹介文は未設定です。" }} />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return notFound();
  }
}