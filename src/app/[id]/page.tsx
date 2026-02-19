import { client } from "@/lib/microcms";
import Image from "next/image";
import Link from "next/link";

export default async function MemberDetail({ params }: { params: { id: string } }) {
  // 特定のメンバー1人分のデータを取得
  const member = await client.get({
    endpoint: "members",
    contentId: params.id,
  });

  return (
    <main className="min-h-screen bg-white p-5 font-bold">
      <Link href="/" className="text-sm underline">← ホームに戻る</Link>
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-6xl mb-5 italic border-b-8 border-black" style={{ borderColor: member.memberColor }}>
          {member.name}
        </h1>
        {member.detail_image && (
          <div className="relative w-full h-96 mb-10 border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <Image src={member.detail_image.url} alt={member.name} fill className="object-cover" />
          </div>
        )}
        <div className="prose prose-xl max-w-none leading-loose" dangerouslySetInnerHTML={{ __html: member.description }} />
      </div>
    </main>
  );
}