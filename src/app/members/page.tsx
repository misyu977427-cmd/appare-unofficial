import { client } from "@/lib/microcms";
import Link from "next/link";

export default async function MembersListPage() {
  const data = await client.getList({ endpoint: "members", queries: { orders: '-createdAt' } });
  const members = data.contents;

  return (
    <main style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <Link href="/" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'underline', display: 'block', marginBottom: '40px' }}>
        ← BACK TO TOP
      </Link>
      <h1 style={{ fontSize: '3rem', fontWeight: '900', fontStyle: 'italic', borderBottom: '10px solid black', paddingBottom: '20px', marginBottom: '60px', textTransform: 'uppercase' }}>
        Member List
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
        {members.map((member: any) => (
          <Link href={`/members/${member.id}`} key={member.id} style={{ textDecoration: 'none', color: 'black' }}>
            <div style={{ border: '6px solid black', padding: '20px', textAlign: 'center', boxShadow: '10px 10px 0px 0px #000' }}>
              <div style={{ width: '150px', height: '150px', margin: '0 auto 20px', borderRadius: '50%', border: '4px solid black', overflow: 'hidden' }}>
                {member.image && <img src={member.image.url} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '900', margin: 0 }}>{member.name}</h3>
              <p style={{ fontWeight: 'bold', color: '#666' }}>{member.color}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}