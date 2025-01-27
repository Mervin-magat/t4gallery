import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { db } from "~/server/db";


export const dynamic = "force-dynamic";

async function Images (){
   const user = await auth();
   if (!user?.userId) {
    throw new Error("Unauthorized");
  }
  const image=await db.query.image.findMany({
    where: (model) => eq(model.userId, user.userId),
    orderBy: (model, {asc}) => asc (model.id),
  });
  return(
    <div className="flex flex-wrap justify-items-center gap-4">
    {image.map((image) => (
      <div key={image.id} className="w-48">
        <img src={image.url}  />
        <div>{image.name}</div >
      </div>
    ))}
  </div>
  );
}


export default async function HomePage() {
  return (
    <main className="p-4">
      <SignedOut>
        <div className="h-full w-full  text-2xl text-center"> Please Sign In Above</div>
      </SignedOut>
      <SignedIn>
        <Images/>
      </SignedIn>
    </main>
  );
}
