import Link from "next/link";
import { notFound } from "next/navigation";

// メンバーデータ
const MEMBERS: Record<string, any> = {
  "rei-asahina": {
    name: "朝比奈 れい",
    name_en: "Rei Asahina",
    color: "赤色",
    birth: "2000.03.17",
    from: "東京都",
    intro: "Appare!の絶対的センター。圧倒的なアイドル性で、グループを牽引する太陽のような存在。",
    image: "https://images.microcms-assets.io/assets/..." // 画像URLだけmicroCMSからコピー
  },
  // 他のメンバーも同様の形式で追加
};

export default function MemberDetailPage({ params }: { params: { id: string } }) {
  const member = MEMBERS[params.id];

  if (!member) return notFound();

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <Link href="/members" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '40px' }}>← BACK TO LIST</Link>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', fontStyle: 'italic', margin: '0 0 10px 0' }}>{member.name}</h1>
        <p style={{ display: 'inline-block', backgroundColor: 'black', color: 'white', padding: '5px 20px', fontWeight: '900', marginBottom: '40px' }}>
          {member.name_en} / {member.color}
        </p>
        <div style={{ textAlign: 'left', border: '4px solid black', padding: '30px', fontWeight: 'bold', lineHeight: '2' }}>
          <p>🎂 BIRTH: {member.birth} / 📍 FROM: {member.from}</p>
          <hr style={{ border: '2px solid black', margin: '20px 0' }} />
          <p style={{ whiteSpace: 'pre-wrap' }}>{member.intro}</p>
        </div>
      </div>
    </main>
  );
}