// src/app/porta-vozes/page.tsx
import styles from './page.module.css';
import { Megaphone, Users, Globe, TrendingUp, Shield, Award, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getPortavoze } from '@/lib/data';

export default async function PortaVozesPage() {
  const portavoze = await getPortavoze();

  const categories = [
    {
      title: "Mídia Digital",
      icon: <Globe size={24} />,
      count: "8+ canais",
      description: "Canais de YouTube, podcasts e plataformas digitais",
      color: "#e9cd7a"
    },
    {
      title: "Influenciadores",
      icon: <Users size={24} />,
      count: "12+ personalidades",
      description: "Pensadores e criadores de conteúdo influentes",
      color: "#b8860b"
    },
    {
      title: "Mídia Tradicional",
      icon: <Megaphone size={24} />,
      count: "5+ veículos",
      description: "Jornais, revistas e emissoras parceiras",
      color: "#daa520"
    },
    {
      title: "Organizações",
      icon: <Shield size={24} />,
      count: "6+ instituições",
      description: "Think tanks e organizações afiliadas",
      color: "#cd853f"
    }
  ];

  const featuredPortavoze = [
    {
      name: "Mídia BH",
      role: "Coletivo de Comunicação, Jornalista e Analista Político",
      platform: "Telegram / Site",
      followers: "250K+",
      engagement: "Muito Alto",
      description: "Agência de notícias focada em política nacional e Especialista em geopolítica e análise de cenários políticos"
    }
  ];

  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOverlay}></div>
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span>PORTA-VOZES E ALIADOS</span>
            <div className={styles.heroDivider}></div>
          </div>
          
          <h1 className={styles.heroTitle}>
            A Voz da Reconstrução
          </h1>
          
          <p className={styles.heroSubtitle}>
            Não trabalhamos no silêncio. Nossas ideias são amplificadas por vozes corajosas 
            que levam a mensagem da reconstrução civilizacional ao mundo.
          </p>
          
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{portavoze.length}+</span>
              <span className={styles.statLabel}>Porta-vozes</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>1M+</span>
              <span className={styles.statLabel}>Alcance Total</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>Plataformas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <div className={styles.sectionHeader}>
          <Filter size={32} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Categorias de Voz</h2>
          <p className={styles.sectionSubtitle}>
            Diversidade de canais e formatos para máxima disseminação
          </p>
        </div>
        
        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categoryCard}>
              <div className={styles.categoryHeader}>
                <div 
                  className={styles.categoryIcon}
                  style={{ color: category.color }}
                >
                  {category.icon}
                  <div 
                    className={styles.categoryIconGlow}
                    style={{ backgroundColor: `${category.color}20` }}
                  ></div>
                </div>
                <div className={styles.categoryNumber}>0{index + 1}</div>
              </div>
              
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <div className={styles.categoryCount}>{category.count}</div>
              <p className={styles.categoryDescription}>{category.description}</p>
              
              <div className={styles.categoryBorder}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Porta-vozes */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <Award size={32} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Destaques do Mês</h2>
          <p className={styles.sectionSubtitle}>
            Os porta-vozes com maior impacto e engajamento recente
          </p>
        </div>
        
        <div className={styles.featuredGrid}>
          {featuredPortavoze.map((portavoz, index) => (
            <div key={index} className={styles.featuredCard}>
              <div className={styles.featuredHeader}>
                <div className={styles.featuredBadge}>DESTAQUE</div>
                <div className={styles.featuredEngagement}>
                  <TrendingUp size={16} />
                  {portavoz.engagement}
                </div>
              </div>
              
              <h3 className={styles.featuredName}>{portavoz.name}</h3>
              <p className={styles.featuredRole}>{portavoz.role}</p>
              
              <div className={styles.featuredPlatform}>
                <Globe size={16} />
                {portavoz.platform}
              </div>
              
              <p className={styles.featuredDescription}>{portavoz.description}</p>
              
              <div className={styles.featuredStats}>
                <div className={styles.featuredStat}>
                  <Users size={14} />
                  <span>{portavoz.followers}</span>
                </div>
                <Link href="#" className={styles.featuredLink}>
                  Ver Perfil Completo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Porta-vozes Grid */}
      <section className={styles.portavoze}>
        <div className={styles.sectionHeader}>
          <Megaphone size={32} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Nossa Rede de Vozes</h2>
          <p className={styles.sectionSubtitle}>
            Conheça todos os porta-vozes e aliados que amplificam nossa mensagem
          </p>
        </div>
        
        <div className={styles.portavozeGrid}>
          {portavoze.map((portavoz) => (
            <Link key={portavoz.id} href={`/porta-vozes/${portavoz.id}`} className={styles.portavozCard}>
              <div className={styles.portavozImage}>
                <Image
                  src={portavoz.img}
                  alt={portavoz.name}
                  width={120}
                  height={120}
                  className={styles.image}
                />
                <div className={styles.imageGlow}></div>
              </div>
              
              <div className={styles.portavozInfo}>
                <h3 className={styles.portavozName}>{portavoz.name}</h3>
                <p className={styles.portavozRole}>{portavoz.role}</p>
                <p className={styles.portavozDescription}>{portavoz.description?.substring(0, 120)}...</p>
                
                <div className={styles.portavozStats}>
                  <div className={styles.portavozStat}>
                    <Users size={12} />
                    <span>{portavoz.stats?.followers || 'N/A'}</span>
                  </div>
                  <div className={styles.portavozStat}>
                    <TrendingUp size={12} />
                    <span>{portavoz.stats?.engagement || 'N/A'}</span>
                  </div>
                </div>
                
                <div className={styles.portavozTags}>
                  <span className={styles.tag}>{portavoz.category}</span>
                  {portavoz.platform && <span className={styles.tag}>{portavoz.platform}</span>}
                </div>
              </div>
              
              <div className={styles.portavozBorder}></div>
            </Link>
          ))}
        </div>
        
        <div className={styles.viewAll}>
          <Link href="/porta-vozes/todos" className={styles.viewAllButton}>
            Ver Todos os Porta-vozes
          </Link>
        </div>
      </section>

      {/* Partnership Call */}
      <section className={styles.partnership}>
        <div className={styles.partnershipContent}>
          <Megaphone size={48} className={styles.partnershipIcon} />
          <h2 className={styles.partnershipTitle}>Torne-se um Porta-voz</h2>
          <p className={styles.partnershipText}>
            Você tem um canal, plataforma ou influência? Junte-se à nossa rede 
            de vozes e ajude a amplificar a mensagem da reconstrução civilizacional.
          </p>
          
          <div className={styles.partnershipSteps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Estudo dos Princípios</h3>
              <p className={styles.stepDescription}>Compreensão profunda do manifesto</p>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Análise de Alinhamento</h3>
              <p className={styles.stepDescription}>Avaliação de conteúdo e público</p>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Formalização da Parceria</h3>
              <p className={styles.stepDescription}>Acordo de colaboração mútua</p>
            </div>
          </div>
          
          <div className={styles.partnershipActions}>
            <Link href="/parceria" className={styles.partnershipButtonPrimary}>
              Solicitar Parceria
            </Link>
            <Link href="/manifesto" className={styles.partnershipButtonSecondary}>
              Conhecer os Princípios
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}