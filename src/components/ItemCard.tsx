// src/components/ItemCard.tsx
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
        return item.description;
      case 'artigo':
        return item.excerpt || item.description.substring(0, 100) + '...';
      case 'member':
      case 'portavoz':
        return item.role || item.bio?.substring(0, 100) + '...';
      default:
        return '';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'plataforma':
      case 'artigo':
        return item.title || 'Item sem título';
      case 'member':
      case 'portavoz':
        return item.name || 'Item sem nome';
      default:
        return 'Item';
    }
  };

  const getImage = () => {
    switch (type) {
      case 'artigo':
        return item.image || '/icons/testes/default.jpg';
      case 'plataforma':
        return item.image || '/icons/testes/default.jpg';
      case 'member':
      case 'portavoz':
        return item.img || '/icons/testes/default.jpg';
      default:
        return '/icons/testes/default.jpg';
    }
  };

  const getPostsCount = () => {
    if (type === 'plataforma') {
      return item.posts || 0;
    }
    return 0;
  };

  const title = getTitle();
  const imageSrc = getImage();
  const description = getDescription();

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
        {type === 'plataforma' && (
          <div className={styles.platformStats}>
            <div className={styles.stat}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>{item.members > 1000 
                ? `${(item.members / 1000).toFixed(1)}K membros` 
                : `${item.members} membros`}
              </span>
            </div>
            
            {item.posts && item.posts > 0 && (
              <div className={styles.stat}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span>{getPostsCount() > 1000 
                  ? `${(getPostsCount() / 1000).toFixed(1)}K posts` 
                  : `${getPostsCount()} posts`}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Mostrar categoria para plataformas */}
        {type === 'plataforma' && (
          <div className={styles.category}>
            {item.category === 'social' && '🌐 Social'}
            {item.category === 'forum' && '💬 Fórum'}
            {item.category === 'media' && '📺 Mídia'}
            {item.category === 'academic' && '🎓 Acadêmico'}
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