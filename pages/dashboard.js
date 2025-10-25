import Link from 'next/link';
import { sampleRecipes } from '../data/recipes';

export default function Dashboard() {
  return (
    <main className="p-4 pb-24">
      <h1 className="text-2xl font-bold mb-4">Recommended for you</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {sampleRecipes.map(r => (
          <Link href={`/recipe/${r.id}`} key={r.id}>
            <a className="block rounded-xl shadow hover:scale-105 transition">
              <img src={r.image} alt={r.name} className="w-full h-40 object-cover rounded-t-xl" />
              <div className="p-3">
                <h3 className="font-semibold">{r.name}</h3>
                <p className="text-sm text-gray-600">⏱ {r.totalTime} min · ⭐ {r.rating}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </main>
  );
}
