// src/components/DestaquesFeed/DestaquesFeed.tsx
'use client';

import { useState, useEffect } from 'react';
import { Artigo } from '@/lib/types';
import styles from './DestaquesFeed.module.css';

interface DestaquesFeedProps {
  initialData?: Artigo[];
  autoRefresh?: boolean; // Auto-refresh a cada X minutos
  refreshInterval?: number; // Em milissegundos
  limit?: number;
}

export default function DestaquesFeed({ 
  initialData = [], 
  autoRefresh = true,
  refreshInterval = 300000, // 5 minutos
  limit = 5
}: DestaquesFeedProps) {
  const [destaques, setDestaques] = useState<Artigo[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchDestaques = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const url = `/api/destaques?limit=${limit}${forceRefresh ? '&refresh=true' : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      setDestaques(data);
      setLastUpdated(new Date());
      
      // Log do cache status
      const cacheStatus = response.headers.get('x-cache');
      console.log(`Destaques carregados (cache: ${cacheStatus})`);
      
    } catch (err) {
      console.error('Erro ao buscar destaques:', err);
      setError('Não foi possível carregar os destaques. Verifique sua conexão.');
      
      // Manter dados anteriores se possível
      if (destaques.length === 0) {
        setDestaques(initialData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData.length === 0) {
      fetchDestaques();
    }
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      fetchDestaques();
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  if (error && destaques.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <p>{error}</p>
        <button 
          onClick={() => fetchDestaques(true)}
          className={styles.retryButton}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          📰 Destaques do Dia
          {loading && <span className={styles.loadingBadge}>Atualizando...</span>}
        </h2>
        
        <div className={styles.controls}>
          <button
            onClick={() => fetchDestaques(true)}
            disabled={loading}
            className={styles.refreshButton}
            title="Forçar atualização"
          >
            🔄
          </button>
          <span className={styles.lastUpdated}>
            Atualizado: {lastUpdated.toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>

      {loading && destaques.length === 0 ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando destaques...</p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {destaques.slice(0, limit).map((artigo) => (
              <article key={artigo.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.category}>{artigo.category}</span>
                  <span className={styles.readTime}>{artigo.readTime}</span>
                </div>
                
                <h3 className={styles.cardTitle}>
                  <a 
                    href={artigo.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {artigo.title}
                  </a>
                </h3>
                
                <p className={styles.cardExcerpt}>{artigo.excerpt || artigo.description}</p>
                
                <div className={styles.cardFooter}>
                  <span className={styles.author}>
                    Por{' '}
                    <a 
                      href={artigo.authorLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {artigo.author}
                    </a>
                  </span>
                  <time className={styles.date}>
                    {new Date(artigo.publishedDate).toLocaleDateString('pt-BR')}
                  </time>
                </div>
              </article>
            ))}
          </div>
          
          {destaques.length === 0 && !loading && (
            <div className={styles.emptyState}>
              <p>Nenhum destaque disponível no momento.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}