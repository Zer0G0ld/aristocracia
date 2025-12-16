// src/app/page.tsx
import Menu from '@/components/Menu/Menu';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';
import { getFeaturedArtigos, getFeaturedMembers, getFeaturedPortavoze } from '@/lib/data';
import { ArrowRight, BookOpen, Megaphone, Users, Award, Target, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Artigo, Portavoz, Member } from '@/lib/types';

export default async function Home() {
  const [featuredArtigos, featuredMembers, featuredPortavoze] = await Promise.all([
    getFeaturedArtigos(),
    getFeaturedMembers(),
    getFeaturedPortavoze()
  ]);

  const pillars = [
    {
      title: "Formação",
      description: "Educação clássica e desenvolvimento intelectual",
      icon: <BookOpen size={32} />,
      color: "#e9cd7a",
      link: "/manifesto/principios"
    },
    {
      title: "Hierarquia",
      description: "Meritocracia e excelência como princípios",
      icon: <Users size={32} />,
      color: "#b8860b",
      link: "/manifesto/principios"
    },
    {
      title: "Responsabilidade",
      description: "Compromisso com a reconstrução civilizacional",
      icon: <Target size={32} />,
      color: "#daa520",
      link: "/manifesto/principios"
    }
  ];

  const featuredSections = [
    {
      title: "Manifesto",
      description: "Conheça nossos princípios e visão de futuro",
      link: "/manifesto",
      image: "/icons/selo.svg",
      featured: true
    },
    {
      title: "Produção Intelectual",
      description: "Obras e pensadores que fundamentam nossa missão",
      link: "/producao-intelectual",
      image: "/icons/png/LibraryofAlexandria.jpg"
    },
    {
      title: "Porta-vozes",
      description: "Vozes que amplificam nossa mensagem",
      link: "/porta-vozes",
      image: "/porta_vozes/Midia_BH.jpg"
    },
    {
      title: "Artigos",
      description: "Análises e reflexões sobre o tempo presente",
      link: "/artigos",
      image: "/icons/png/aristocracia.png"
    }
  ];

  return (
    <>
      <Menu />
      <Header />
      
      <main className={styles.main}>
        {/* Seção de Pilares */}
        <section className={styles.pillars}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.titleAccent}>O FUTURO É GLORIOSO</span>
                Os Três Pilares da Reconstrução
              </h2>
              <p className={styles.sectionSubtitle}>
                Fundamentos que sustentam nossa missão de renovação civilizacional
              </p>
            </div>
            
            <div className={styles.pillarsGrid}>
              {pillars.map((pillar, index) => (
                <Link key={index} href={pillar.link} className={styles.pillarCard}>
                  <div 
                    className={styles.pillarIcon}
                    style={{ color: pillar.color }}
                  >
                    {pillar.icon}
                    <div 
                      className={styles.pillarIconGlow}
                      style={{ backgroundColor: `${pillar.color}20` }}
                    ></div>
                  </div>
                  
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarDescription}>{pillar.description}</p>
                  
                  <div className={styles.pillarLink}>
                    <span>Explorar</span>
                    <ArrowRight size={16} />
                  </div>
                  
                  <div 
                    className={styles.pillarBorder}
                    style={{ backgroundColor: pillar.color }}
                  ></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Destaques */}
        <section className={styles.featured}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <Award size={32} className={styles.sectionIcon} />
              <h2 className={styles.sectionTitle}>Destaques do Hub</h2>
              <p className={styles.sectionSubtitle}>
                Conheça os principais conteúdos e seções do nosso movimento
              </p>
            </div>
            
            <div className={styles.featuredGrid}>
              {featuredSections.map((section, index) => (
                <Link key={index} href={section.link} className={styles.featuredCard}>
                  {section.featured && (
                    <div className={styles.featuredBadge}>DESTAQUE</div>
                  )}
                  
                  <div className={styles.featuredImage}>
                    <Image
                      src={section.image}
                      alt={section.title}
                      width={400}
                      height={200}
                      className={styles.image}
                    />
                    <div className={styles.imageOverlay}></div>
                  </div>
                  
                  <div className={styles.featuredContent}>
                    <h3 className={styles.featuredTitle}>{section.title}</h3>
                    <p className={styles.featuredDescription}>{section.description}</p>
                    
                    <div className={styles.featuredLink}>
                      <span>Acessar</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                  
                  <div className={styles.featuredBorder}></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Artigos em Destaque */}
        {featuredArtigos && featuredArtigos.length > 0 && (
          <section className={styles.articles}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <BookOpen size={32} className={styles.sectionIcon} />
                <h2 className={styles.sectionTitle}>Artigos em Destaque</h2>
                <p className={styles.sectionSubtitle}>
                  Leitura essencial para compreensão do momento presente
                </p>
              </div>
              
              <div className={styles.articlesGrid}>
                {featuredArtigos.slice(0, 3).map((artigo: Artigo) => (
                  <Link key={artigo.id} href={`/artigos/${artigo.id}`} className={styles.articleCard}>
                    <div className={styles.articleHeader}>
                      <div className={styles.articleCategory}>{artigo.category}</div>
                      <div className={styles.articleDate}>{artigo.date}</div>
                    </div>
                    
                    <h3 className={styles.articleTitle}>{artigo.title}</h3>
                    <p className={styles.articleDescription}>{artigo.description?.substring(0, 120)}...</p>
                    
                    <div className={styles.articleFooter}>
                      <div className={styles.articleAuthor}>
                        {artigo.author?.name || "Aristocracia"}
                      </div>
                      <div className={styles.articleLink}>
                        Ler artigo
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className={styles.viewAll}>
                <Link href="/artigos" className={styles.viewAllButton}>
                  Ver Todos os Artigos
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Seção de Porta-vozes em Destaque */}
        {featuredPortavoze && featuredPortavoze.length > 0 && (
          <section className={styles.portavoze}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <Megaphone size={32} className={styles.sectionIcon} />
                <h2 className={styles.sectionTitle}>Vozes da Reconstrução</h2>
                <p className={styles.sectionSubtitle}>
                  Conheça alguns dos porta-vozes que amplificam nossa mensagem
                </p>
              </div>
              
              <div className={styles.portavozeGrid}>
                {featuredPortavoze.slice(0, 4).map((portavoz: Portavoz) => (
                  <Link key={portavoz.id} href={`/porta-vozes/${portavoz.id}`} className={styles.portavozCard}>
                    <div className={styles.portavozImage}>
                      <Image
                        src={portavoz.img}
                        alt={portavoz.name}
                        width={80}
                        height={80}
                        className={styles.image}
                      />
                      <div className={styles.imageGlow}></div>
                    </div>
                    
                    <div className={styles.portavozInfo}>
                      <h3 className={styles.portavozName}>{portavoz.name}</h3>
                      <p className={styles.portavozRole}>{portavoz.role}</p>
                      
                      <div className={styles.portavozStats}>
                        <Users size={12} />
                        <span>{portavoz.stats?.subscribers || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className={styles.portavozBorder}></div>
                  </Link>
                ))}
              </div>
              
              <div className={styles.viewAll}>
                <Link href="/porta-vozes" className={styles.viewAllButton}>
                  Ver Todos os Porta-vozes
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Seção de Intelectuais em Destaque */}
        {featuredMembers && featuredMembers.length > 0 && (
          <section className={styles.intellectuals}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <Users size={32} className={styles.sectionIcon} />
                <h2 className={styles.sectionTitle}>Mentes da Reconstrução</h2>
                <p className={styles.sectionSubtitle}>
                  Intelectuais que fundamentam o pensamento direitista contemporâneo
                </p>
              </div>
              
              <div className={styles.intellectualsGrid}>
                {featuredMembers.slice(0, 4).map((member: Member) => (
                  <Link key={member.id} href={`/producao-intelectual/${member.id}`} className={styles.intellectualCard}>
                    <div className={styles.intellectualImage}>
                      <Image
                        src={member.img}
                        alt={member.name}
                        width={80}
                        height={80}
                        className={styles.image}
                      />
                      <div className={styles.imageGlow}></div>
                    </div>
                    
                    <div className={styles.intellectualInfo}>
                      <h3 className={styles.intellectualName}>{member.name}</h3>
                      <p className={styles.intellectualRole}>{member.role}</p>
                      
                      <div className={styles.intellectualStats}>
                        <BookOpen size={12} />
                        <span>{member.stats?.articlesCount || 0} obras</span>
                      </div>
                    </div>
                    
                    <div className={styles.intellectualBorder}></div>
                  </Link>
                ))}
              </div>
              
              <div className={styles.viewAll}>
                <Link href="/producao-intelectual" className={styles.viewAllButton}>
                  Ver Todos os Intelectuais
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Chamada Final */}
        <section className={styles.cta}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <div className={styles.ctaIcon}>
                <Award size={48} />
              </div>
              
              <h2 className={styles.ctaTitle}>Junte-se à Reconstrução</h2>
              <p className={styles.ctaText}>
                O futuro glorioso não será construído por espectadores, mas por agentes. 
                Assuma sua responsabilidade histórica e faça parte do movimento.
              </p>
              
              <div className={styles.ctaButtons}>
                <Link href="/manifesto/assinar" className={styles.ctaButtonPrimary}>
                  Assinar Manifesto
                </Link>
                <Link href="/manifesto" className={styles.ctaButtonSecondary}>
                  Conhecer os Princípios
                </Link>
              </div>
              
              <div className={styles.ctaQuote}>
                <div className={styles.quoteMark}>"</div>
                <p className={styles.quoteText}>
                  Não somos refugiados da decadência, somos construtores da glória.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}