// src/components/ArtigosSection/ArtigosSection.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Artigo } from '@/lib/types';
import styles from './ArtigosSection.module.css';

// Modifique para receber artigos como prop opcional
interface ArtigosSectionProps {
  initialArtigos?: Artigo[];
}

export default function ArtigosSection({ initialArtigos }: ArtigosSectionProps = {}) {
  const [artigos, setArtigos] = useState<Artigo[]>(initialArtigos || []);
  const [loading, setLoading] = useState(!initialArtigos);
  const [featuredOnly, setFeaturedOnly] = useState(true);

  useEffect(() => {
    // Se já recebeu artigos via props, não precisa carregar
    if (initialArtigos && initialArtigos.length > 0) {
      setLoading(false);
      return;
    }

    async function loadArtigos() {
      try {
        const response = await fetch('/data/artigos.json');
        const data = await response.json();
        setArtigos(data.artigos || []);
      } catch (error) {
        console.error('Erro ao carregar artigos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadArtigos();
  }, [initialArtigos]);

  const filteredArtigos = featuredOnly 
    ? artigos.filter(artigo => artigo.featured)
    : artigos;

  if (loading) {
    return (
      <section className={styles.section}>
        <div className="center">
          <h2 className="section-title">Artigos em Destaque</h2>
          <p className={styles.loading}>Carregando artigos...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="sec-artigos" className={styles.section}>
      <div className="center">
        <div className={styles.header}>
          <h2 className="section-title">Artigos em Destaque</h2>
          <div className={styles.filters}>
            <button 
              className={`${styles.filterBtn} ${featuredOnly ? styles.active : ''}`}
              onClick={() => setFeaturedOnly(true)}
            >
              Em Destaque
            </button>
            <button 
              className={`${styles.filterBtn} ${!featuredOnly ? styles.active : ''}`}
              onClick={() => setFeaturedOnly(false)}
            >
              Todos
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {filteredArtigos.map(artigo => (
            <div key={artigo.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <Image
                  src={artigo.image}
                  alt={artigo.title}
                  width={400}
                  height={250}
                  className={styles.image}
                />
                <span className={styles.category}>{artigo.category}</span>
              </div>
              
              <div className={styles.content}>
                <h3 className={styles.title}>
                  <a 
                    href={artigo.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.titleLink}
                  >
                    {artigo.title}
                  </a>
                </h3>
                
                <p className={styles.description}>
                  {artigo.description.length > 200 
                    ? `${artigo.description.substring(0, 200)}...` 
                    : artigo.description}
                </p>
                
                <div className={styles.meta}>
                  <div className={styles.author}>
                    <span>por </span>
                    <a 
                      href={artigo.authorLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.authorLink}
                    >
                      {artigo.author}
                    </a>
                  </div>
                  <div className={styles.details}>
                    <span className={styles.readTime}>{artigo.readTime}</span>
                    <span className={styles.date}>{artigo.publishedDate}</span>
                  </div>
                </div>
                
                <div className={styles.tags}>
                  {artigo.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className={styles.tag}>#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.obs}>
          <h3>
            os textos são escolhidos na aba:texto no{' '}
            <a href="https://discord.gg/XncGYt2Y7g" target="_blank" rel="noopener noreferrer">
              Discord:Aristocracia
            </a>{' '}
            e serão trocados aos domingos
          </h3>
        </div>
      </div>
    </section>
  );
}