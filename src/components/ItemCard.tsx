import Image from 'next/image';
import Link from 'next/link';
import { Member, Portavoz, Plataforma } from '@/lib/types';

interface ItemCardProps {
  item: Member | Portavoz | Plataforma;
  type: 'member' | 'portavoz' | 'plataforma';
  showDetails?: boolean;
}

export default function ItemCard({ item, type, showDetails = true }: ItemCardProps) {
  const getLink = () => {
    switch(type) {
      case 'member': return `/producao-intelectual/${item.id}`;
      case 'portavoz': return `/porta-vozes/${item.id}`;
      case 'plataforma': return `/plataformas/${item.id}`;
      default: return '#';
    }
  };

  const getDescription = () => {
    if (type === 'member' || type === 'portavoz') {
      const memberItem = item as Member | Portavoz;
      return memberItem.role || memberItem.bio?.substring(0, 100);
    } else {
      const plataformaItem = item as Plataforma;
      return `${plataformaItem.type} • ${plataformaItem.access}`;
    }
  };

  return (
    <div className="item-card">
      <Link href={getLink()}>
        <div className="item-image">
          <Image 
            src={item.img || '/icons/default.jpg'}
            alt={item.name}
            width={120}
            height={120}
          />
        </div>
        <div className="item-content">
          <h3>{item.name}</h3>
          {showDetails && (
            <>
              <p className="item-description">{getDescription()}</p>
              {type === 'member' && (
                <div className="item-stats">
                  <span>📝 {(item as Member).stats?.articlesCount || 0} artigos</span>
                </div>
              )}
            </>
          )}
        </div>
      </Link>
    </div>
  );
}