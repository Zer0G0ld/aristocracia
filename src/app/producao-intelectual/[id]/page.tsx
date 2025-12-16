// src/app/producao-intelectual/[id]/page.tsx
import { getMemberById, getMembers } from '@/lib/data';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Book, FileText, Users, Award, Globe, Mail, Youtube, Twitter, Instagram, Download, ExternalLink } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const members = await getMembers();
  return members.map(member => ({
    id: member.id,
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
    case 'website':
      return <Globe size={20} />;
    case 'email':
      return <Mail size={20} />;
    default:
      return <ExternalLink size={20} />;
  }
};

export default async function MemberPage({ params }: PageProps) {
  const { id } = await params;
  const member = await getMemberById(id);

  if (!member) {
    notFound();
  }

  const works = [
    {
      title: "A Crise da Modernidade",
      type: "Livro",
      year: "2024",
      description: "Análise profunda dos fundamentos da crise civilizacional",
      pages: "320 páginas",
      status: "Publicado"
    },
    {
      title: "Hierarquia e Excelência",
      type: "Ensaio Acadêmico",
      year: "2023",
      description: "Defesa da meritocracia como princípio organizacional",
      pages: "45 páginas",
      status: "Publicado"
    },
    {
      title: "Filosofia Política Contemporânea",
      type: "Curso Online",
      year: "2024",
      description: "Série de 12 aulas sobre pensamento político atual",
      pages: "8 horas",
      status: "Disponível"
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
              src={member.img}
              alt={member.name}
              width={200}
              height={200}
              className={styles.image}
            />
            <div className={styles.imageGlow}></div>
          </div>
          
          <div className={styles.heroInfo}>
            <div className={styles.heroBadge}>
              <span>INTELECTUAL HUB DIREITISTA</span>
              <div className={styles.heroDivider}></div>
            </div>
            
            <h1 className={styles.heroTitle}>{member.name}</h1>
            <p className={styles.heroRole}>{member.role}</p>
            <p className={styles.heroBio}>{member.bio}</p>
            
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <Book size={24} className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{member.stats?.articlesCount || 0}</span>
                  <span className={styles.statLabel}>Obras</span>
                </div>
              </div>
              
              <div className={styles.stat}>
                <Users size={24} className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{member.stats?.subscribers || 'N/A'}</span>
                  <span className={styles.statLabel}>Seguidores</span>
                </div>
              </div>
              
              <div className={styles.stat}>
                <Award size={24} className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{member.stats?.engagement || 'N/A'}</span>
                  <span className={styles.statLabel}>Engajamento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.contentGrid}>
          {/* Left Column - Expertise & Links */}
          <div className={styles.leftColumn}>
            {/* Expertise */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Book size={20} />
                <h3 className={styles.cardTitle}>Áreas de Expertise</h3>
              </div>
              
              <div className={styles.expertiseGrid}>
                {member.expertise.map((skill, index) => (
                  <div key={index} className={styles.expertiseItem}>
                    <div className={styles.expertiseBullet}></div>
                    <span className={styles.expertiseText}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Types */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <FileText size={20} />
                <h3 className={styles.cardTitle}>Tipos de Conteúdo</h3>
              </div>
              
              <div className={styles.tags}>
                {member.contentTypes.map((type, index) => (
                  <span key={index} className={styles.tag}>{type}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Globe size={20} />
                <h3 className={styles.cardTitle}>Canais e Contato</h3>
              </div>
              
              <div className={styles.links}>
                {Object.entries(member.links).map(([platform, link]) => (
                  <a
                    key={platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <div className={styles.linkIcon}>
                      {getPlatformIcon(platform)}
                    </div>
                    <div className={styles.linkContent}>
                      <span className={styles.linkPlatform}>{link.label || platform}</span>
                      <span className={styles.linkUrl}>{link.url.replace(/^https?:\/\//, '')}</span>
                    </div>
                    <ExternalLink size={16} className={styles.linkArrow} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Works */}
          <div className={styles.rightColumn}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Award size={20} />
                <h3 className={styles.cardTitle}>Obras Principais</h3>
              </div>
              
              <div className={styles.works}>
                {works.map((work, index) => (
                  <div key={index} className={styles.work}>
                    <div className={styles.workHeader}>
                      <div className={styles.workType}>{work.type}</div>
                      <div className={styles.workYear}>{work.year}</div>
                    </div>
                    
                    <h4 className={styles.workTitle}>{work.title}</h4>
                    <p className={styles.workDescription}>{work.description}</p>
                    
                    <div className={styles.workFooter}>
                      <div className={styles.workMeta}>
                        <span className={styles.workPages}>
                          <FileText size={14} />
                          {work.pages}
                        </span>
                        <span className={styles.workStatus}>{work.status}</span>
                      </div>
                      
                      <div className={styles.workActions}>
                        <button className={styles.workButton}>
                          <Download size={16} />
                          PDF
                        </button>
                        <Link href="#" className={styles.workLink}>
                          Detalhes
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.viewAll}>
                <Link href="#" className={styles.viewAllLink}>
                  Ver Todas as Obras
                </Link>
              </div>
            </div>

            {/* Publications Timeline */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Award size={20} />
                <h3 className={styles.cardTitle}>Linha do Tempo</h3>
              </div>
              
              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineYear}>2024</div>
                  <div className={styles.timelineContent}>
                    <h4 className={styles.timelineTitle}>Livro Publicado</h4>
                    <p className={styles.timelineText}>A Crise da Modernidade</p>
                  </div>
                </div>
                
                <div className={styles.timelineItem}>
                  <div className={styles.timelineYear}>2023</div>
                  <div className={styles.timelineContent}>
                    <h4 className={styles.timelineTitle}>Ensaio Acadêmico</h4>
                    <p className={styles.timelineText}>Hierarquia e Excelência</p>
                  </div>
                </div>
                
                <div className={styles.timelineItem}>
                  <div className={styles.timelineYear}>2022</div>
                  <div className={styles.timelineContent}>
                    <h4 className={styles.timelineTitle}>Série de Palestras</h4>
                    <p className={styles.timelineText}>Filosofia Política</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className={styles.back}>
        <Link href="/producao-intelectual" className={styles.backLink}>
          ← Voltar para Produção Intelectual
        </Link>
      </div>
    </main>
  );
}