import { getPlataformas } from '@/lib/data';
import ItemCard from '@/components/ItemCard';

export default async function PlataformasPage() {
  const plataformas = await getPlataformas();

  return (
    <div className="container">
      <header className="page-header">
        <h1>Plataformas</h1>
        <p>Comunidades e fóruns do Hub Direitista</p>
      </header>

      <div className="grid">
        {plataformas.map(plataforma => (
          <ItemCard 
            key={plataforma.id} 
            item={plataforma} 
            type="plataforma" 
          />
        ))}
      </div>
    </div>
  );
}