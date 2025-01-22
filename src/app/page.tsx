import Link from "next/link";

const mockUrls = [
  
  "https://l83dugrv84.ufs.sh/f/JjS6TmY0oLt2p0JbvSIdyANrqMHVt567FiOskouQRzea10Dl",
  "https://l83dugrv84.ufs.sh/f/JjS6TmY0oLt2kU9O8VxiXFUI1wQij6lmTW9zMcnfs2eKHdpS",
  "https://l83dugrv84.ufs.sh/f/JjS6TmY0oLt2hjeugTlLJrkWfVtTIFRBXhpEU2qNbly3wOGD",
  "https://l83dugrv84.ufs.sh/f/JjS6TmY0oLt2hjeugTlLJrkWfVtTIFRBXhpEU2qNbly3wOGD",
  "https://l83dugrv84.ufs.sh/f/JjS6TmY0oLt2SiLMzP37JTQO4SUzbPjFWXY50RAcqLvpZyCD"   


  
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="p-4">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url}  />
          </div>
        ))}
      </div>
    </main>
  );
}
