// src/app/producao-intelectual/page.tsx
import styles from './page.module.css';
import { Book, FileText, Users, Award, Search, Filter, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getMembers } from '@/lib/data';

export default async function ProducaoIntelectualPage() {
  const members = await getMembers();

  const categories = [
    {
      title: "Livros",
      icon: <Book size={24} />,
      count: "12+ obras",
      description: "Publicações completas sobre filosofia política e história",
      color: "#e9cd7a"
    },
    {
      title: "Artigos Acadêmicos",
      icon: <FileText size={24} />,
      count: "50+ textos",
      description: "Ensaios e estudos publicados em revistas especializadas",
      color: "#b8860b"
    },
    {
      title: "Conferências",
      icon: <Users size={24} />,
      count: "20+ eventos",
      description: "Palestras e debates públicos gravados e transcritos",
      color: "#daa520"
    },
    {
      title: "Cursos Online",
      icon: <Award size={24} />,
      count: "8 cursos",
      description: "Programas estruturados de formação intelectual",
      color: "#cd853f"
    }
  ];

  const featuredWorks = [
    {
      title: "A Crise da Modernidade",
      author: "Prof. Armando Leal",
      type: "Livro",
      year: "2024",
      description: "Análise profunda dos fundamentos da crise civilizacional contemporânea",
      pages: "320 páginas"
    },
    {
      title: "Hierarquia e Excelência",
      author: "Dr. Cristian Brocca",
      type: "Ensaio",
      year: "2023",
      description: "Defesa da meritocracia como princípio organizacional natural",
      pages: "45 páginas"
    },
    {
      title: "A Tradição Viva",
      author: "Mestra Francielly Stempkowski",
      type: "Curso",
      year: "2024",
      description: "Série de 12 aulas sobre preservação e renovação da tradição",
      pages: "8 horas"
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
            <span>PRODUÇÃO INTELECTUAL</span>
            <div className={styles.heroDivider}></div>
          </div>
          
          <h1 className={styles.heroTitle}>
            O Arsenal da Reconstrução
          </h1>
          
          <p className={styles.heroSubtitle}>
            Conhecimento não é poder. Conhecimento aplicado é poder. 
            Aqui está a produção intelectual que fundamenta e sustenta nossa missão.
          </p>
          
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{members.length}+</span>
              <span className={styles.statLabel}>Intelectuais</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100+</span>
              <span className={styles.statLabel}>Obras Publicadas</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>5000+</span>
              <span className={styles.statLabel}>Horas de Conteúdo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <div className={styles.sectionHeader}>
          <Filter size={32} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Categorias de Produção</h2>
          <p className={styles.sectionSubtitle}>
            Organização temática do nosso acervo intelectual
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
              
              <Link href={`/producao-intelectual/categoria/${category.title.toLowerCase()}`} className={styles.categoryButton}>
                Explorar
                <Search size={16} />
              </Link>
              
              <div 
                className={styles.categoryBorder}
                style={{ backgroundColor: category.color }}
              ></div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Works */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <Award size={32} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Obras em Destaque</h2>
          <p className={styles.sectionSubtitle}>
            As produções mais relevantes e influentes do nosso acervo
          </p>
        </div>
        
        <div className={styles.featuredGrid}>
          {featuredWorks.map((work, index) => (
            <div key={index} className={styles.workCard}>
              <div className={styles.workHeader}>
                <div className={styles.workType}>{work.type}</div>
                <div className={styles.workYear}>{work.year}</div>
              </div>
              
              <h3 className={styles.workTitle}>{work.title}</h3>
              <p className={styles.workAuthor}>por {work.author}</p>
              <p className={styles.workDescription}>{work.description}</p>
              
              <div className={styles.workFooter}>
                <div className={styles.workPages}>
                  <FileText size={14} />
                  {work.pages}
                </div>
                <div className={styles.workActions}>
                  <button className={styles.workButton}>
                    <Download size={16} />
                    PDF
                  </button>
                  <Link href={`/producao-intelectual/obra/${work.title.toLowerCase().replace(/\s+/g, '-')}`} className={styles.workLink}>
                    Ler Mais
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Intellectuals Grid */}
      <section className={styles.intellectuals}>
        <div className={styles.sectionHeader}>
          <Users size={32} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Nossos Intelectuais</h2>
          <p className={styles.sectionSubtitle}>
            A mente por trás das ideias. Conheça os produtores do nosso acervo
          </p>
        </div>
        
        <div className={styles.intellectualsGrid}>
          {members.map((member) => (
            <Link key={member.id} href={`/producao-intelectual/${member.id}`} className={styles.intellectualCard}>
              <div className={styles.intellectualImage}>
                <Image
                  src={member.img}
                  alt={member.name}
                  width={120}
                  height={120}
                  className={styles.image}
                />
                <div className={styles.imageGlow}></div>
              </div>
              
              <div className={styles.intellectualInfo}>
                <h3 className={styles.intellectualName}>{member.name}</h3>
                <p className={styles.intellectualRole}>{member.role}</p>
                <p className={styles.intellectualBio}>{member.bio.substring(0, 100)}...</p>
                
                <div className={styles.intellectualStats}>
                  <div className={styles.intellectualStat}>
                    <Book size={12} />
                    <span>{member.stats?.articlesCount || 0} obras</span>
                  </div>
                  <div className={styles.intellectualStat}>
                    <Users size={12} />
                    <span>{member.stats?.subscribers || 'N/A'} seguidores</span>
                  </div>
                </div>
                
                <div className={styles.intellectualTags}>
                  {member.expertise.slice(0, 2).map((skill) => (
                    <span key={skill} className={styles.tag}>{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className={styles.intellectualBorder}></div>
            </Link>
          ))}
        </div>
        
        <div className={styles.viewAll}>
          <Link href="/producao-intelectual/todos" className={styles.viewAllButton}>
            Ver Todos os Intelectuais
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <Book size={48} className={styles.ctaIcon} />
          <h2 className={styles.ctaTitle}>Participe da Produção</h2>
          <p className={styles.ctaText}>
            Tem algo a contribuir? Junte-se ao nosso círculo de produção intelectual 
            e faça parte da construção do pensamento direitista.
          </p>
          
          <div className={styles.ctaButtons}>
            <Link href="/manifesto/assinar" className={styles.ctaButtonPrimary}>
              Tornar-se Membro
            </Link>
            <Link href="/submissao" className={styles.ctaButtonSecondary}>
              Submeter Trabalho
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}