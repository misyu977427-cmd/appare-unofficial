import { client } from "@/lib/microcms";

export default async function NewsDetail({ params }: { params: { id: string } }) {
  const item = await client.get({
    endpoint: "news",
    contentId: params.id,
  });

  const newsData = await client.getList({ 
  endpoint: "news",
  queries: { orders: '-date', limit: 3 } // ✅ これで3件に制限
});

  return (
    <main className="min-h-screen bg-white p-10 font-bold text-black">
      <article className="max-w-3xl mx-auto">
        <p className="text-gray-500 mb-2">{new Date(item.date).toLocaleDateString('ja-JP')}</p>
        <h1 className="text-4xl font-black mb-10 border-b-8 border-black pb-4 italic">{item.title}</h1>
        <div 
          className="prose prose-xl max-w-none leading-loose whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </article>
    </main>
  );

  
}