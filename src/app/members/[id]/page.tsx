import { client } from "@/lib/microcms";
import Image from "next/image";

export default async function MemberDetail({ params }: { params: { id: string } }) {
  const member = await client.get({
    endpoint: "members",
    contentId: params.id,
  });

  return (
    <main className="min-h-screen bg-white p-10 font-bold text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl mb-8 italic border-b-8 border-black pb-2" style={{ borderColor: member.color }}>
          {member.name}
        </h1>
        {member.image && (
          <div className="relative w-full h-96 mb-10 border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <Image src={member.image.url} alt={member.name} fill className="object-cover" />
          </div>
        )}
        <p className="text-2xl leading-loose">“{member.catchphrase}”</p>
      </div>
    </main>
  );
}