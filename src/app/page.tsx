import Link from "next/link";
import { db } from "~/server/db";


const mockUrls = [
  
  "https://l83dugrv84.ufs.sh/f/JjS6TmY0oLt2p0JbvSIdyANrqMHVt567FiOskouQRzea10Dl",
  "https://l83dugrv84.ufs.sh/f/JjS6TmY0oLt2kU9O8VxiXFUI1wQij6lmTW9zMcnfs2eKHdpS",

  "https://l83dugrv84.ufs.sh/f/JjS6TmY0oLt2SiLMzP37JTQO4SUzbPjFWXY50RAcqLvpZyCD"   


  
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {

  const posts=await db.query.posts.findMany();

  return (
    <main className="p-4">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url}  />
          </div>
        ))}
      </div>
    </main>
  );
}
