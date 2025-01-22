import Link from "next/link";
import { db } from "~/server/db";



export default async function HomePage() {

  const image=await db.query.image.findMany({
    orderBy: (model, {desc}) => desc (model.id),
  });

  return (
    <main className="p-4">
      <div className="flex flex-wrap gap-4">
        {image.map((post) => (
          <div key={post.id}></div>
        ))}
        {image.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url}  />
            <div>{image.name}</div >
          </div>
        ))}
      </div>
    </main>
  );
}
