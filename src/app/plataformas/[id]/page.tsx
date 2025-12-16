// src/app/plataformas/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getPlataformaById, getPlataformas } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

interface PlataformaPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const plataformas = await getPlataformas();
  return plataformas.map((plataforma) => ({
    id: plataforma.id,
  }));
}

export default async function PlataformaPage({ params }: PlataformaPageProps) {
  const { id } = await params;
  const plataforma = await getPlataformaById(id);

  if (!plataforma) {
    notFound();
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social': return '🌐';
      case 'forum': return '💬';
      case 'media': return '📺';
      case 'academic': return '🎓';
      default: return '🔗';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'growing': return '#f59e0b';
      case 'inactive': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.categoryBadge}>
            {getCategoryIcon(plataforma.category)}
            <span>{plataforma.category === 'social' ? 'Rede Social' : 
                   plataforma.category === 'forum' ? 'Fórum' :
                   plataforma.category === 'media' ? 'Mídia' : 'Acadêmico'}</span>
          </div>
          
          <h1 className={styles.title}>{plataforma.title}</h1>
          
          <p className={styles.description}>{plataforma.description}</p>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{plataforma.members}</div>
              <div className={styles.statLabel}>Membros</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{plataforma.posts}</div>
              <div className={styles.statLabel}>Publicações</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statusBadge} style={{ backgroundColor: getStatusColor(plataforma.status) }}>
                {plataforma.status === 'active' ? 'Ativa' : 
                 plataforma.status === 'growing' ? 'Crescendo' : 'Inativa'}
              </div>
              <div className={styles.statLabel}>Status</div>
            </div>
          </div>
          
          <a 
            href={plataforma.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.visitButton}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Visitar Plataforma
          </a>
        </div>
        
        {plataforma.image && (
          <div className={styles.heroImage}>
            <Image
              src={plataforma.image}
              alt={plataforma.title}
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className={styles.detailsSection}>
        <div className={styles.detailsContent}>
          <h2 className={styles.sectionTitle}>Sobre a Plataforma</h2>
          
          <div className={styles.detailsGrid}>
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>🌐 Acesso</h3>
              <p className={styles.detailText}>
                {plataforma.access === 'public' ? 'Público' : 
                 plataforma.access === 'private' ? 'Privado' : 'Por Convite'}
              </p>
            </div>
            
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>📅 Criada em</h3>
              <p className={styles.detailText}>
                {new Date(plataforma.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>🔄 Atualizada</h3>
              <p className={styles.detailText}>
                {new Date(plataforma.updatedAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>🎯 Tipo</h3>
              <p className={styles.detailText}>{plataforma.type}</p>
            </div>
          </div>
          
          {plataforma.benefits && plataforma.benefits.length > 0 && (
            <div className={styles.benefitsSection}>
              <h3 className={styles.sectionTitle}>Benefícios</h3>
              <ul className={styles.benefitsList}>
                {plataforma.benefits.map((benefit: string, index: number) => (
                  <li key={index} className={styles.benefitItem}>
                    <svg width="20" height="20" fill="#e9cd7a" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {plataforma.tags && plataforma.tags.length > 0 && (
            <div className={styles.tagsSection}>
              <h3 className={styles.sectionTitle}>Tags</h3>
              <div className={styles.tagsList}>
                {plataforma.tags.map((tag: string, index: number) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.navigationSection}>
        <Link href="/plataformas" className={styles.backButton}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar para Plataformas
        </Link>
      </div>
    </div>
  );
}