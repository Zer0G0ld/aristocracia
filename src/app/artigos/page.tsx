'use client';

import { useState, useEffect } from 'react';
import { getArtigos, type Artigo } from '@/lib/data'; // Adicione 'type'
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  Filter,
  Star,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import styles from './page.module.css';

export default function ArtigosPage() {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadArtigos();
  }, []);

  const loadArtigos = async () => {
    try {
      setLoading(true);
      const data = await getArtigos();
      setArtigos(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar artigos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filterType: string) => {
    setFilter(filterType);
  };

  const filteredArtigos = artigos.filter(artigo => {
    if (filter === 'featured' && !artigo.featured) return false;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        artigo.title.toLowerCase().includes(term) ||
        artigo.description.toLowerCase().includes(term) ||
        artigo.author.toLowerCase().includes(term) ||
        artigo.category.toLowerCase().includes(term) ||
        (artigo.tags && artigo.tags.some((tag: string) => tag.toLowerCase().includes(term))) // Adicione tipo
      );
    }
    
    return true;
  });

  const featuredArtigos = artigos.filter(artigo => artigo.featured);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2 className={styles.errorTitle}>Erro ao carregar</h2>
          <p className={styles.errorMessage}>{error}</p>
          <button onClick={loadArtigos} className={styles.retryButton}>
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <header className={styles.pageHeader}>
        <Link href="/" className={styles.backButton}>
          <ArrowLeft size={16} />
          Voltar
        </Link>
        
        <h1 className={styles.pageTitle}>Biblioteca de Artigos</h1>
        <p className={styles.pageSubtitle}>
          Análises profundas, reflexões críticas e pensamento estratégico para a reconstrução civilizacional
        </p>
      </header>

      {/* Featured Articles */}
      {featuredArtigos.length > 0 && (
        <section className={styles.featuredSection}>
          <h2 className={styles.featuredTitle}>
            <Star size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
            Artigos em Destaque
          </h2>
          
          <div className={styles.featuredGrid}>
            {featuredArtigos.slice(0, 3).map(artigo => (
              <article key={artigo.id} className={styles.articleCard}>
                <Link href={`/artigos/${artigo.id}`}>
                  <div className={styles.articleImage}>
                    <Image
                      src={artigo.image}
                      alt={artigo.title}
                      width={400}
                      height={250}
                      priority
                    />
                    <span className={styles.categoryBadge}>
                      <Star size={12} style={{ marginRight: '5px' }} />
                      {artigo.category}
                    </span>
                  </div>
                  
                  <div className={styles.articleContent}>
                    <h3>{artigo.title}</h3>
                    <p className={styles.articleExcerpt}>
                      {artigo.description.substring(0, 120)}...
                    </p>
                    
                    <div className={styles.articleMeta}>
                      <span className={styles.author}>{artigo.author}</span>
                      <span className={styles.readTime}>{artigo.readTime}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Search & Filters */}
      <div className={styles.filtersSection}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Buscar artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <BookOpen size={20} className={styles.searchIcon} />
        </div>
        
        <div className={styles.filters}>
          <button 
            className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => handleFilter('all')}
          >
            <Filter size={16} />
            Todos
          </button>
          
          <button 
            className={`${styles.filterBtn} ${filter === 'featured' ? styles.filterBtnActive : ''}`}
            onClick={() => handleFilter('featured')}
          >
            <Star size={16} />
            Destaques
          </button>
          
          <button 
            className={`${styles.filterBtn} ${filter === 'latest' ? styles.filterBtnActive : ''}`}
            onClick={() => handleFilter('latest')}
          >
            <TrendingUp size={16} />
            Mais Recentes
          </button>
        </div>
      </div>

      {/* All Articles */}
      <div className={styles.articlesGrid}>
        {filteredArtigos.length > 0 ? (
          filteredArtigos.map(artigo => (
            <article key={artigo.id} className={styles.articleCard}>
              <Link href={`/artigos/${artigo.id}`}>
                <div className={styles.articleImage}>
                  <Image
                    src={artigo.image}
                    alt={artigo.title}
                    width={400}
                    height={220}
                  />
                  <span className={styles.categoryBadge}>
                    {artigo.category}
                  </span>
                </div>
                
                <div className={styles.articleContent}>
                  <h3>{artigo.title}</h3>
                  <p className={styles.articleExcerpt}>
                    {artigo.description.substring(0, 150)}...
                  </p>
                  
                  <div className={styles.articleMeta}>
                    <div className={styles.metaLeft}>
                      <span className={styles.author}>
                        <User size={14} />
                        {artigo.author}
                      </span>
                      <span className={styles.date}>
                        <Calendar size={14} />
                        {formatDate(artigo.publishedDate)}
                      </span>
                    </div>
                    <span className={styles.readTime}>
                      <Clock size={14} />
                      {artigo.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📄</div>
            <h3 className={styles.emptyTitle}>Nenhum artigo encontrado</h3>
            <p className={styles.emptyDescription}>
              {searchTerm ? `Nenhum resultado para "${searchTerm}"` : 'Nenhum artigo disponível no momento'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredArtigos.length > 0 && (
        <div className={styles.pagination}>
          <button className={styles.paginationButton} disabled>
            <ArrowLeft size={16} />
            Anterior
          </button>
          
          <div className={styles.pageNumbers}>
            <span className={styles.pageNumberActive}>1</span>
            <span className={styles.pageNumber}>2</span>
            <span className={styles.pageNumber}>3</span>
          </div>
          
          <button className={styles.paginationButton}>
            Próxima
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}