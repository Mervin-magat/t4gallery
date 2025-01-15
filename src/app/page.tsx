import { index } from "drizzle-orm/mysql-core";
import Link from "next/link";

const mockUrls = [
  "https://l83dugrv84.ufs.sh/f/JjS6TmY0oLt21NyKBiocJ4qgoxapOZy52YB0RuekHhTli6dW"
]

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));
export default function HomePage() {
  return (
    <main className="">
  <div className="flex flex-wrap gap 4">

{mockImages.map((image) => (
  <div key={image.id}  className="w-48"> 
  <img src={image.url} />
  </div>
))
  
}
    
  </div>
    </main>
  );
}
