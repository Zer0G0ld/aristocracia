'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getArtigoById, getRelatedArtigos, type Artigo } from '@/lib/data'; // Adicione 'type'
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft,
  Share2,
  Bookmark,
  ExternalLink,
  Tag,
  ChevronRight
} from 'lucide-react';
import styles from './page.module.css';

export default function ArtigoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [relatedArtigos, setRelatedArtigos] = useState<Artigo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArtigo();
  }, [id]);

  const loadArtigo = async () => {
    try {
      setLoading(true);
      const artigoData = await getArtigoById(parseInt(id));
      if (artigoData) {
        setArtigo(artigoData);
        
        // Carrega artigos relacionados
        const related = await getRelatedArtigos(artigoData.category, parseInt(id));
        setRelatedArtigos(related);
      } else {
        setError('Artigo não encontrado');
      }
    } catch (err) {
      setError('Erro ao carregar artigo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const shareArtigo = () => {
    if (navigator.share && artigo) {
      navigator.share({
        title: artigo.title,
        text: artigo.description,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (error || !artigo) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <div className={styles.notFoundIcon}>📄</div>
          <h2 className={styles.notFoundTitle}>Artigo não encontrado</h2>
          <p className={styles.notFoundMessage}>
            O artigo que você está procurando não existe ou foi removido.
          </p>
          <Link href="/artigos" className={styles.retryButton}>
            <ArrowLeft size={16} />
            Voltar para Artigos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <Link href="/artigos" className={styles.backButton}>
        <ArrowLeft size={16} />
        Voltar para Artigos
      </Link>

      {/* Article Header */}
      <header className={styles.articleHeader}>
        <span className={styles.categoryBadge}>
          <Tag size={12} style={{ marginRight: '5px' }} />
          {artigo.category}
        </span>
        
        <h1 className={styles.articleTitle}>{artigo.title}</h1>
        
        <div className={styles.articleMeta}>
          <div className={styles.metaItem}>
            <User size={16} />
            <span>{artigo.author}</span>
          </div>
          
          <div className={styles.metaItem}>
            <Calendar size={16} />
            <span>{formatDate(artigo.publishedDate)}</span>
          </div>
          
          <div className={styles.metaItem}>
            <Clock size={16} />
            <span>{artigo.readTime}</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className={styles.articleHero}>
        <Image
          src={artigo.image}
          alt={artigo.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 900px"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Share Buttons */}
      <div className={styles.shareSection}>
        <button onClick={shareArtigo} className={styles.shareButton}>
          <Share2 size={16} />
          Compartilhar
        </button>
        
        <button className={styles.shareButton}>
          <Bookmark size={16} />
          Salvar
        </button>
        
        <a 
          href={artigo.link || '#'} // Use o link do artigo
          className={styles.shareButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={16} />
          Abrir Original
        </a>
      </div>

      {/* Article Content */}
      <article className={styles.articleContent}>
        <div className={styles.contentWrapper}>
          <p className={styles.articleLead}>
            {artigo.description}
          </p>
          
          {/* Simulated content - você pode substituir pelo conteúdo real */}
          <h2>Introdução</h2>
          <p>
            O presente artigo busca analisar as bases intelectuais do movimento direitista contemporâneo,
            examinando como as tradições clássicas se mesclam com as demandas do século XXI para formar
            um pensamento coerente e capaz de oferecer alternativas à crise civilizacional.
          </p>
          
          <h2>Contexto Histórico</h2>
          <p>
            A tradição direitista sempre esteve fundamentada em princípios que valorizam a hierarquia,
            a ordem, a responsabilidade individual e o respeito às instituições. Esses valores, longe
            de serem meras abstrações, moldaram civilizações e garantiram a continuidade cultural.
          </p>
          
          <blockquote>
            "A verdadeira aristocracia não é aquela que nasceu em berço de ouro, mas aquela que
            assume a responsabilidade de conduzir seu povo rumo à grandeza."
          </blockquote>
          
          <h2>Desafios Contemporâneos</h2>
          <p>
            O século XXI apresenta desafios únicos: globalização acelerada, fragmentação cultural,
            crise de identidade e o desafio tecnológico. A resposta direitista a esses desafios
            não pode ser simplesmente nostálgica, mas deve ser reconstrutiva.
          </p>
          
          <h3>Reconstrução Cultural</h3>
          <p>
            A reconstrução cultural passa necessariamente pela reafirmação dos valores tradicionais
            em diálogo com as realidades modernas. Não se trata de rejeitar o progresso, mas de
            direcioná-lo para fins nobres.
          </p>
          
          <h2>Conclusão</h2>
          <p>
            O futuro glorioso que almejamos só será possível através de uma síntese criativa entre
            tradição e inovação, entre sabedoria ancestral e tecnologia moderna. Cabe a esta geração
            assumir essa responsabilidade histórica.
          </p>
        </div>
      </article>

      {/* Author Section */}
      <section className={styles.authorSection}>
        <div className={styles.authorImage}>
          <Image
            src="/persons/Armando_Leal.png" // Substitua pela imagem real do autor
            alt={artigo.author}
            width={100}
            height={100}
          />
        </div>
        
        <div className={styles.authorInfo}>
          <h3>{artigo.author}</h3>
          <p className={styles.authorBio}>
            Intelectual e pensador dedicado à reconstrução civilizacional. Sua obra explora
            as intersecções entre tradição, modernidade e o futuro da civilização ocidental.
          </p>
        </div>
      </section>

      {/* Tags */}
      {artigo.tags && artigo.tags.length > 0 && (
        <div className={styles.tagsSection}>
          <h4 className={styles.tagsTitle}>Tags:</h4>
          <div className={styles.tagsList}>
            {artigo.tags.map((tag: string, index: number) => ( // Adicione tipo
              <span key={index} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedArtigos.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.sectionTitle}>
            Artigos Relacionados
            <ChevronRight size={20} style={{ marginLeft: '10px', verticalAlign: 'middle' }} />
          </h2>
          
          <div className={styles.relatedGrid}>
            {relatedArtigos.slice(0, 3).map((relatedArtigo: Artigo) => (
              <Link 
                key={relatedArtigo.id} 
                href={`/artigos/${relatedArtigo.id}`}
                className={styles.relatedCard}
              >
                <div className={styles.relatedImage}>
                  <Image
                    src={relatedArtigo.image}
                    alt={relatedArtigo.title}
                    width={200}
                    height={120}
                  />
                </div>
                
                <div className={styles.relatedContent}>
                  <h4>{relatedArtigo.title}</h4>
                  <p className={styles.relatedExcerpt}>
                    {relatedArtigo.description.substring(0, 80)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className={styles.ctaSection}>
        <p className={styles.ctaText}>
          Este artigo faz parte de uma série dedicada ao pensamento direitista.
          Quer explorar mais conteúdos como este?
        </p>
        
        <div className={styles.ctaButtons}>
          <Link href="/artigos" className={styles.ctaButton}>
            Explorar Mais Artigos
          </Link>
          
          <Link href="/manifesto" className={styles.ctaButtonSecondary}>
            Conhecer o Manifesto
          </Link>
        </div>
      </div>
    </div>
  );
}