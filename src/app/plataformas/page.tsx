// src/app/plataformas/page.tsx
import { getPlataformas } from '@/lib/data';
import ItemCard from '@/components/ItemCard';
import styles from './page.module.css';

export default async function PlataformasPage() {
  const plataformas = await getPlataformas();
  
  // Categorias de plataformas
  const categories = [
    { id: 'all', label: 'Todas', count: plataformas.length },
    { id: 'social', label: 'Redes Sociais', count: plataformas.filter(p => p.category === 'social').length },
    { id: 'forum', label: 'Fóruns', count: plataformas.filter(p => p.category === 'forum').length },
    { id: 'media', label: 'Mídia', count: plataformas.filter(p => p.category === 'media').length },
    { id: 'academic', label: 'Acadêmico', count: plataformas.filter(p => p.category === 'academic').length },
  ];

  // Plataformas em destaque
  const featuredPlatforms = plataformas.filter(plataforma => plataforma.featured);

  // Estatísticas
  const totalMembers = plataformas.reduce((sum, p) => sum + p.members, 0);
  const activePlatforms = plataformas.filter(p => p.status === 'active').length;
  const totalPosts = plataformas.reduce((sum, p) => sum + (p.posts || 0), 0);

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <header className={`${styles.pageHeader} ${styles.animateFadeIn}`}>
        <h1 className={styles.pageTitle}>Plataformas do Conhecimento</h1>
        <p className={styles.pageSubtitle}>
          Fóruns, comunidades e espaços digitais onde o pensamento aristocrático floresce
        </p>
        <p className={styles.pageDescription}>
          Explore as principais plataformas que compõem o ecossistema intelectual da 
          Aristocracia. Cada espaço é um pilar na construção do pensamento sofisticado.
        </p>
      </header>

      {/* Stats Section */}
      <div className={`${styles.statsSection} ${styles.animateFadeIn} ${styles.delay1}`}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{plataformas.length}</div>
          <div className={styles.statLabel}>Plataformas</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>
            {totalMembers > 1000 ? `${(totalMembers / 1000).toFixed(1)}K` : totalMembers}
          </div>
          <div className={styles.statLabel}>Membros</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{activePlatforms}</div>
          <div className={styles.statLabel}>Ativas</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>
            {totalPosts > 1000 ? `${(totalPosts / 1000).toFixed(1)}K` : totalPosts}
          </div>
          <div className={styles.statLabel}>Publicações</div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className={`${styles.categoriesBar} ${styles.animateFadeIn} ${styles.delay2}`}>
        {categories.map(category => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${category.id === 'all' ? styles.categoryButtonActive : ''}`}
          >
            {category.label}
            {category.count > 0 && (
              <span className={styles.categoryCount}>
                {' '}({category.count})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Featured Platforms */}
      {featuredPlatforms.length > 0 && (
        <div className={`${styles.featuredSection} ${styles.animateFadeIn} ${styles.delay3}`}>
          <h2 className={styles.featuredTitle}>Plataformas em Destaque</h2>
          <div className={styles.featuredGrid}>
            {featuredPlatforms.map(plataforma => (
              <ItemCard 
                key={plataforma.id} 
                data={{ type: 'plataforma', item: plataforma }}
                featured={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Platforms Grid */}
      {plataformas.length > 0 ? (
        <div className={`${styles.grid} ${styles.animateFadeIn} ${styles.delay4}`}>
          {plataformas.map(plataforma => (
            <ItemCard 
              key={plataforma.id} 
              data={{ type: 'plataforma', item: plataforma }}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <h3 className={styles.emptyTitle}>Nenhuma Plataforma Encontrada</h3>
          <p className={styles.emptyMessage}>
            As plataformas do ecossistema estão sendo catalogadas. 
            Em breve você poderá explorar todos os espaços do conhecimento aristocrático.
          </p>
        </div>
      )}

      {/* Page Footer */}
      <footer className={styles.pageFooter}>
        <div className={styles.contributeSection}>
          <h3 className={styles.contributeTitle}>Sua Plataforma Aqui</h3>
          <p className={styles.contributeText}>
            Conhece ou administra uma plataforma que faz parte do ecossistema intelectual 
            aristocrático? Contribua para o catálogo e compartilhe conhecimento.
          </p>
          <a 
            href="mailto:contribuicoes@aristocracia.com" 
            className={styles.contributeButton}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Sugerir Plataforma
          </a>
        </div>
        
        <p className={styles.footerText}>
          Aristocracia Intellectualis • Catálogo de Plataformas • Atualizado em {new Date().toLocaleDateString('pt-BR')}
        </p>
      </footer>
    </div>
  );
}