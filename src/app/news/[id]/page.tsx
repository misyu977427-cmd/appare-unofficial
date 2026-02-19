import { client } from "@/lib/microcms";
import Link from "next/link";

export default async function NewsDetail({ params }: { params: { id: string } }) {
  const item = await client.get({
    endpoint: "news",
    contentId: params.id,
  });

  return (
    <main className="min-h-screen bg-white p-8 font-bold text-black">
      <Link href="/" className="text-sm underline mb-10 block">← ホームに戻る</Link>
      <article className="max-w-3xl mx-auto">
        {/* microCMS側のフィールド名が "date" か "publishedAt" か確認してください */}
        <p className="text-gray-500 mb-2">{new Date(item.date || item.publishedAt).toLocaleDateString('ja-JP')}</p>
        <h1 className="text-4xl font-black mb-10 border-b-8 border-black pb-4 italic">{item.title}</h1>
        <div 
          className="prose prose-xl max-w-none leading-loose whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: item.content || item.body }}
        />
      </article>
    </main>
  );
}