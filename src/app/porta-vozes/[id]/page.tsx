// src/app/porta-vozes/[id]/page.tsx
import { getPortavoze } from '@/lib/data';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Megaphone, Users, Globe, TrendingUp, Award, Youtube, Twitter, Instagram, Facebook, Link as LinkIcon, ExternalLink, Calendar } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const portavoze = await getPortavoze();
  return portavoze.map(portavoz => ({
    id: portavoz.id,
  }));
}

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'youtube':
      return <Youtube size={20} />;
    case 'twitter':
      return <Twitter size={20} />;
    case 'instagram':
      return <Instagram size={20} />;
    case 'facebook':
      return <Facebook size={20} />;
    case 'website':
      return <Globe size={20} />;
    default:
      return <LinkIcon size={20} />;
  }
};

export default async function PortavozDetailPage({ params }: PageProps) {
  const { id } = await params;
  const portavoze = await getPortavoze();
  const portavoz = portavoze.find(p => p.id === id);

  if (!portavoz) {
    notFound();
  }

  const recentContent = [
    {
      title: "Entrevista sobre Geopolítica",
      platform: "YouTube",
      date: "15 Jan 2024",
      views: "25K",
      description: "Análise do cenário político internacional"
    },
    {
      title: "Artigo: Crise Institucional",
      platform: "Site",
      date: "10 Jan 2024",
      views: "10K",
      description: "Reflexão sobre a deterioração das instituições"
    },
    {
      title: "Live: Futuro da Direita",
      platform: "Twitter",
      date: "05 Jan 2024",
      views: "8K",
      description: "Debate sobre os rumos do pensamento direitista"
    }
  ];

  const collaborations = [
    {
      title: "Série de Entrevistas",
      partner: "Hub Direitista",
      date: "Jan-Mar 2024",
      description: "Entrevistas exclusivas com membros fundadores"
    },
    {
      title: "Cobertura de Eventos",
      partner: "Círculo de Estudos",
      date: "Dez 2023",
      description: "Transmissão de seminários e debates"
    },
    {
      title: "Produção de Conteúdo",
      partner: "Biblioteca HD",
      date: "2023-Presente",
      description: "Criação de material educativo conjunto"
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
          <div className={styles.heroImage}>
            <Image
              src={portavoz.img}
              alt={portavoz.name}
              width={200}
              height={200}
              className={styles.image}
            />
            <div className={styles.imageGlow}></div>
          </div>
          
          <div className={styles.heroInfo}>
            <div className={styles.heroBadge}>
              <span>PORTA-VOZ OFICIAL</span>
              <div className={styles.heroDivider}></div>
            </div>
            
            <h1 className={styles.heroTitle}>{portavoz.name}</h1>
            <p className={styles.heroRole}>{portavoz.role}</p>
            <p className={styles.heroDescription}>{portavoz.bio}</p>
            
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <Users size={24} className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{portavoz.stats?.followers || 'N/A'}</span>
                  <span className={styles.statLabel}>Seguidores</span>
                </div>
              </div>
              
              <div className={styles.stat}>
                <TrendingUp size={24} className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{portavoz.stats?.engagement || 'N/A'}</span>
                  <span className={styles.statLabel}>Engajamento</span>
                </div>
              </div>
              
              <div className={styles.stat}>
                <Award size={24} className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{portavoz.stats?.reach || 'N/A'}</span>
                  <span className={styles.statLabel}>Alcance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.contentGrid}>
          {/* Left Column - Info & Links */}
          <div className={styles.leftColumn}>
            {/* Platform Info */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Globe size={20} />
                <h3 className={styles.cardTitle}>Plataformas Principais</h3>
              </div>
              
              <div className={styles.platforms}>
                {Object.entries(portavoz.links || {}).map(([platform, link]) => (
                  <a
                    key={platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.platformLink}
                  >
                    <div className={styles.platformIcon}>
                      {getPlatformIcon(platform)}
                    </div>
                    <div className={styles.platformContent}>
                      <span className={styles.platformName}>{link.label || platform}</span>
                      <span className={styles.platformUrl}>{link.url.replace(/^https?:\/\//, '')}</span>
                    </div>
                    <ExternalLink size={16} className={styles.platformArrow} />
                  </a>
                ))}
              </div>
            </div>

            {/* Category & Type */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Megaphone size={20} />
                <h3 className={styles.cardTitle}>Categoria & Especialidade</h3>
              </div>
              
              <div className={styles.categories}>
                <div className={styles.category}>
                  <span className={styles.categoryLabel}>Tipo:</span>
                  <span className={styles.categoryValue}>{portavoz.category}</span>
                </div>
                
                <div className={styles.category}>
                  <span className={styles.categoryLabel}>Plataforma:</span>
                  <span className={styles.categoryValue}>{portavoz.platform}</span>
                </div>
                
                <div className={styles.category}>
                  <span className={styles.categoryLabel}>Foco:</span>
                  <span className={styles.categoryValue}>{portavoz.focus || "Política e Cultura"}</span>
                </div>
              </div>
              
              <div className={styles.tags}>
                {portavoz.tags?.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Partnership Info */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Award size={20} />
                <h3 className={styles.cardTitle}>Parceria com HD</h3>
              </div>
              
              <div className={styles.partnershipInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Desde:</span>
                  <span className={styles.infoValue}>{portavoz.since || "2023"}</span>
                </div>
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Nível:</span>
                  <span className={styles.infoValue}>{portavoz.partnershipLevel || "Oficial"}</span>
                </div>
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Status:</span>
                  <span className={`${styles.infoValue} ${styles.active}`}>Ativo</span>
                </div>
              </div>
              
              <p className={styles.partnershipDescription}>
                Parceiro oficial na disseminação dos princípios e ideias do Hub Direitista.
              </p>
            </div>
          </div>

          {/* Right Column - Content & Collaborations */}
          <div className={styles.rightColumn}>
            {/* Recent Content */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Calendar size={20} />
                <h3 className={styles.cardTitle}>Conteúdo Recente</h3>
              </div>
              
              <div className={styles.recentContent}>
                {recentContent.map((item, index) => (
                  <div key={index} className={styles.contentItem}>
                    <div className={styles.contentHeader}>
                      <div className={styles.contentPlatform}>
                        {getPlatformIcon(item.platform)}
                        <span>{item.platform}</span>
                      </div>
                      <div className={styles.contentDate}>{item.date}</div>
                    </div>
                    
                    <h4 className={styles.contentTitle}>{item.title}</h4>
                    <p className={styles.contentDescription}>{item.description}</p>
                    
                    <div className={styles.contentFooter}>
                      <div className={styles.contentStats}>
                        <Users size={14} />
                        <span>{item.views} visualizações</span>
                      </div>
                      <a href="#" className={styles.contentLink}>
                        Acessar Conteúdo
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaborations */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Award size={20} />
                <h3 className={styles.cardTitle}>Colaborações com HD</h3>
              </div>
              
              <div className={styles.collaborations}>
                {collaborations.map((collab, index) => (
                  <div key={index} className={styles.collaboration}>
                    <div className={styles.collaborationHeader}>
                      <h4 className={styles.collaborationTitle}>{collab.title}</h4>
                      <div className={styles.collaborationDate}>{collab.date}</div>
                    </div>
                    
                    <div className={styles.collaborationPartner}>
                      <span>Parceiro:</span>
                      <strong>{collab.partner}</strong>
                    </div>
                    
                    <p className={styles.collaborationDescription}>{collab.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Stats */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <TrendingUp size={20} />
                <h3 className={styles.cardTitle}>Impacto da Parceria</h3>
              </div>
              
              <div className={styles.impactStats}>
                <div className={styles.impactStat}>
                  <div className={styles.impactIcon}>
                    <Users size={24} />
                  </div>
                  <div className={styles.impactContent}>
                    <span className={styles.impactNumber}>50K+</span>
                    <span className={styles.impactLabel}>Novos Seguidores HD</span>
                  </div>
                </div>
                
                <div className={styles.impactStat}>
                  <div className={styles.impactIcon}>
                    <Megaphone size={24} />
                  </div>
                  <div className={styles.impactContent}>
                    <span className={styles.impactNumber}>100+</span>
                    <span className={styles.impactLabel}>Menções HD</span>
                  </div>
                </div>
                
                <div className={styles.impactStat}>
                  <div className={styles.impactIcon}>
                    <Award size={24} />
                  </div>
                  <div className={styles.impactContent}>
                    <span className={styles.impactNumber}>15+</span>
                    <span className={styles.impactLabel}>Eventos Conjuntos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className={styles.back}>
        <Link href="/porta-vozes" className={styles.backLink}>
          ← Voltar para Porta-vozes
        </Link>
      </div>
    </main>
  );
}