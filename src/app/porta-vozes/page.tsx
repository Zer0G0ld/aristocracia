import { getPortavoze } from '@/lib/data';
import ItemCard from '@/components/ItemCard';

export default async function PortaVozesPage() {
  const portavoze = await getPortavoze();

  return (
    <div className="container">
      <header className="page-header">
        <h1>Porta-vozes</h1>
        <p>Mídias e influenciadores parceiros</p>
      </header>

      <div className="grid">
        {portavoze.map(portavoz => (
          <ItemCard 
            key={portavoz.id} 
            item={portavoz} 
            type="portavoz" 
          />
        ))}
      </div>
    </div>
  );
}