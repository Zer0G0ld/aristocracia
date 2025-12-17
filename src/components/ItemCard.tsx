import Image from 'next/image';
import Link from 'next/link';
import { Member, Portavoz, Plataforma, Artigo } from '@/lib/types';
import styles from './ItemCard.module.css';

type ItemCardData =
  | { type: 'member'; item: Member }
  | { type: 'portavoz'; item: Portavoz }
  | { type: 'plataforma'; item: Plataforma }
  | { type: 'artigo'; item: Artigo };

interface ItemCardProps {
  data: ItemCardData;
  featured?: boolean;
  showDetails?: boolean;
}

export default function ItemCard({ data, featured = false, showDetails = true }: ItemCardProps) {
  const { item, type } = data;

  const getLink = () => {
    switch (type) {
      case 'member': return `/producao-intelectual/${item.id}`;
      case 'portavoz': return `/porta-vozes/${item.id}`;
      case 'plataforma': return `/plataformas/${item.id}`;
      case 'artigo': return `/artigos/${item.id}`;
      default: return '#';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'plataforma':
        return (item as Plataforma).description || '';
      case 'artigo':
        const artigo = item as Artigo;
        return artigo.excerpt || artigo.description.substring(0, 100) + '...';
      case 'member':
      case 'portavoz':
        return (item as Member | Portavoz).bio?.substring(0, 100) + '...' || '';
      default:
        return '';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'artigo':
        return (item as Artigo).title;
      case 'plataforma':
        return (item as Plataforma).name;
      case 'member':
      case 'portavoz':
        return (item as Member | Portavoz).name;
      default:
        return 'Item';
    }
  };

  const getImage = () => {
    switch (type) {
      case 'artigo':
        return (item as Artigo).image;
      case 'plataforma':
      case 'member':
      case 'portavoz':
        return (item as Plataforma | Member | Portavoz).img;
      default:
        return '/icons/testes/default.jpg';
    }
  };

  const getMembersCount = () => {
    if (type === 'plataforma') {
      return (item as Plataforma).members || 0;
    }
    return 0;
  };

  const title = getTitle();
  const imageSrc = getImage();
  const description = getDescription();
  const membersCount = getMembersCount();

  return (
    <Link href={getLink()} className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardImage}>
          <Image 
            src={imageSrc}
            alt={title}
            width={400}
            height={200}
            className={styles.image}
            priority={featured}
          />
          {featured && (
            <div className={styles.featuredBadge}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.2 6.5 10.266a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              Destaque
            </div>
          )}
        </div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        
        {showDetails && description && (
          <p className={styles.cardDescription}>{description}</p>
        )}

        {/* Mostrar stats específicos para plataformas */}
        {type === 'plataforma' && membersCount > 0 && (
          <div className={styles.platformStats}>
            <div className={styles.stat}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>{membersCount > 1000 
                ? `${(membersCount / 1000).toFixed(1)}K membros` 
                : `${membersCount} membros`}
              </span>
            </div>
          </div>
        )}

        {/* Mostrar categoria para plataformas */}
        {type === 'plataforma' && (
          <div className={styles.category}>
            {(item as Plataforma).category || 'Comunidade'}
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.viewLink}>
          {type === 'plataforma' ? 'Explorar' : 'Ver detalhes'}
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}