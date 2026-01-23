import { client } from "@/lib/microcms";

// microCMSから取得するデータの型（設計図）
type Member = {
  id: string;
  name: string;
  name_en: string;
  color: string;
  catchphrase: string;
};

export default async function Home() {
  // ⚠️ microCMSから全メンバーデータを取得
  const data = await client.getList<Member>({ endpoint: "members" });
  const members = data.contents;

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <header className="py-6 px-5 border-b-8 border-black sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black italic tracking-tighter text-black">Appare! UNOFFICIAL</h1>
            <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 font-bold rounded">FAN ARCHIVE</span>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto py-12 px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {members.map((member) => (
            <div 
              key={member.id} 
              className="border-4 border-black p-8 hover:translate-x-1 hover:-translate-y-1 transition-all shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center bg-white"
              style={{ borderColor: member.color }}
            >
              <div 
                className="w-32 h-32 rounded-full mb-6 border-4 border-black shadow-inner" 
                style={{ backgroundColor: member.color }}
              ></div>
              <h3 className="text-3xl font-black mb-2">{member.name}</h3>
              <p className="text-xs font-bold text-gray-400 mb-4 tracking-[0.2em] uppercase">
                {member.name_en}
              </p>
              <div className="h-1 w-16 bg-black mb-5"></div>
              <p className="text-sm font-bold leading-relaxed italic text-gray-700">
                “{member.catchphrase}”
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}