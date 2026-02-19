import { client } from "@/lib/microcms";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

export default async function MembersListPage() {
  const data = await client.getList({ endpoint: "members", queries: { orders: '-createdAt' } });
  const members = data.contents;

  return (
    <main className="min-h-screen bg-white p-10 text-black">
      <Link href="/" className="text-sm font-black underline mb-12 block uppercase tracking-widest">← Back to Top</Link>
      <h1 className="text-7xl font-black italic mb-20 border-b-[10px] border-black pb-6 uppercase tracking-tighter">Member List</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {members.map((member: any) => (
          <Link href={`/members/${member.id}`} key={member.id} target="_blank" className="block group">
            <div className="border-[6px] border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center bg-white group-hover:bg-gray-50 transition-all" style={{ borderColor: member.color }}>
              <div className="w-40 h-40 rounded-full mb-8 border-4 border-black overflow-hidden relative shadow-inner">
                {member.image && <Image src={member.image.url} alt={member.name} fill className="object-cover" />}
              </div>
              <h3 className="text-4xl font-black mb-2">{member.name}</h3>
              <p className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest">{member.name_en}</p>
              <p className="text-md font-bold italic">“{member.catchphrase}”</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}