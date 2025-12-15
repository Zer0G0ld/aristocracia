// src/app/manifesto/principios/page.tsx
import styles from './page.module.css';
import { BookOpen, Crown, Shield, Target, Users, Award } from 'lucide-react';
import Link from 'next/link';

export default function PrincipiosPage() {
  const principles = [
    {
      icon: <BookOpen size={40} />,
      title: "Formação Intelectual",
      color: "#e9cd7a",
      description: "Educação clássica como fundamento do pensamento",
      details: [
        "Leitura profunda dos mestres clássicos",
        "Estudo rigoroso da filosofia, história e política",
        "Desenvolvimento do pensamento crítico",
        "Formação de caráter junto com intelecto",
        "Excelência como padrão mínimo"
      ],
      quote: "A mente não é um vaso a ser preenchido, mas um fogo a ser aceso.",
      author: "Plutarco"
    },
    {
      icon: <Crown size={40} />,
      title: "Hierarquia Natural",
      color: "#b8860b",
      description: "Reconhecimento das diferenças e meritocracia real",
      details: [
        "Autoridade baseada em conhecimento e caráter",
        "Liderança por mérito demonstrado",
        "Respeito à experiência e sabedoria",
        "Responsabilidade proporcional ao cargo",
        "Excelência como critério de ascensão"
      ],
      quote: "A igualdade é a guerra contra toda a excelência.",
      author: "Aristóteles"
    },
    {
      icon: <Shield size={40} />,
      title: "Responsabilidade Ética",
      color: "#daa520",
      description: "Compromisso com o legado e dever para com o futuro",
      details: [
        "Assunção das consequências dos atos",
        "Honra aos compromissos assumidos",
        "Serviço à comunidade acima do interesse",
        "Transmissão do legado recebido",
        "Construção para as gerações futuras"
      ],
      quote: "A liberdade é o reconhecimento da necessidade.",
      author: "Hegel"
    }
  ];

  const virtues = [
    {
      title: "Coragem",
      description: "Para enfrentar a incompreensão e nadar contra a corrente",
      icon: "🦁"
    },
    {
      title: "Disciplina",
      description: "Para perseverar no estudo e na ação consistente",
      icon: "⚔️"
    },
    {
      title: "Prudência",
      description: "Para agir no momento certo e da maneira adequada",
      icon: "🎯"
    },
    {
      title: "Justiça",
      description: "Para tratar cada um segundo seu mérito e necessidade",
      icon: "⚖️"
    }
  ];

  return (
    <main className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span>PRINCÍPIOS FUNDAMENTAIS</span>
            <div className={styles.heroDivider}></div>
          </div>
          
          <h1 className={styles.heroTitle}>
            Os Três Pilares da Reconstrução
          </h1>
          
          <p className={styles.heroSubtitle}>
            Formação, Hierarquia e Responsabilidade não são meros conceitos, 
            mas estruturas que sustentam nossa visão de excelência civilizacional.
          </p>
        </div>
      </section>

      {/* Princípios Detalhados */}
      <section className={styles.principles}>
        <div className={styles.principlesGrid}>
          {principles.map((principle, index) => (
            <article key={index} className={styles.principleCard}>
              <div className={styles.principleHeader}>
                <div 
                  className={styles.principleIconWrapper}
                  style={{ color: principle.color }}
                >
                  {principle.icon}
                  <div 
                    className={styles.principleGlow}
                    style={{ backgroundColor: `${principle.color}20` }}
                  ></div>
                </div>
                
                <div className={styles.principleNumber}>0{index + 1}</div>
              </div>
              
              <h2 className={styles.principleTitle}>
                {principle.title}
              </h2>
              
              <p className={styles.principleDescription}>
                {principle.description}
              </p>
              
              <div className={styles.principleQuote}>
                <div className={styles.quoteMark}>"</div>
                <p className={styles.quoteText}>{principle.quote}</p>
                <p className={styles.quoteAuthor}>— {principle.author}</p>
              </div>
              
              <ul className={styles.principleList}>
                {principle.details.map((detail, idx) => (
                  <li key={idx} className={styles.principleItem}>
                    <div 
                      className={styles.listBullet}
                      style={{ backgroundColor: principle.color }}
                    ></div>
                    {detail}
                  </li>
                ))}
              </ul>
              
              <div 
                className={styles.principleBorder}
                style={{ backgroundColor: principle.color }}
              ></div>
            </article>
          ))}
        </div>
      </section>

      {/* Virtudes */}
      <section className={styles.virtues}>
        <div className={styles.sectionHeader}>
          <Target size={32} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>As Quatro Virtudes do Militante</h2>
        </div>
        
        <div className={styles.virtuesGrid}>
          {virtues.map((virtue, index) => (
            <div key={index} className={styles.virtueCard}>
              <div className={styles.virtueIcon}>{virtue.icon}</div>
              <h3 className={styles.virtueTitle}>{virtue.title}</h3>
              <p className={styles.virtueDescription}>{virtue.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <Award size={48} className={styles.ctaIcon} />
          <h2 className={styles.ctaTitle}>Assuma a Excelência</h2>
          <p className={styles.ctaText}>
            Estes princípios não são para serem apenas estudados, mas vividos. 
            A verdadeira formação começa quando teoria se torna prática.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/manifesto/assinar" className={styles.ctaButtonPrimary}>
              Assinar Manifesto
            </Link>
            <Link href="/formacao/iniciar" className={styles.ctaButtonSecondary}>
              Iniciar Formação
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}