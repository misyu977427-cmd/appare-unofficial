import { client } from "@/lib/microcms";
import Link from "next/link";

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const item = await client.get({ endpoint: "news", contentId: params.id });

  return (
    <main className="min-h-screen bg-white p-10 text-black font-bold">
      <Link href="/" className="text-sm underline mb-16 block">← BACK TO TOP</Link>
      <article className="max-w-4xl mx-auto">
        <p className="text-gray-500 mb-4">{new Date(item.date || item.createdAt).toLocaleDateString()}</p>
        <h1 className="text-6xl font-black mb-12 italic border-b-8 border-black pb-6">{item.title}</h1>
        {/* microCMSのリッチエディタの内容を表示 */}
        <div 
          className="prose prose-xl max-w-none leading-loose" 
          dangerouslySetInnerHTML={{ __html: item.content || item.body }} 
        />
      </article>
    </main>
  );
}