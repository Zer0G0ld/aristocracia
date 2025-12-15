// src/app/manifesto/visao/page.tsx
import styles from './page.module.css';
import { Target, Globe, Users, Building, Calendar, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function VisaoPage() {
  const timeline = [
    {
      year: "2024-2025",
      title: "Fundação",
      icon: <Building size={24} />,
      items: [
        "Estabelecimento do núcleo fundador",
        "Formação dos primeiros membros",
        "Definição da identidade e princípios",
        "Criação da infraestrutura digital"
      ]
    },
    {
      year: "2026-2028",
      title: "Expansão",
      icon: <Globe size={24} />,
      items: [
        "Crescimento da comunidade intelectual",
        "Influência no debate público",
        "Formação de novos círculos",
        "Projetos concretos de impacto"
      ]
    },
    {
      year: "2029-2032",
      title: "Consolidação",
      icon: <Users size={24} />,
      items: [
        "Liderança intelectual reconhecida",
        "Instituições próprias estabelecidas",
        "Transformação cultural visível",
        "Transmissão geracional assegurada"
      ]
    },
    {
      year: "2033+",
      title: "Glória",
      icon: <Trophy size={24} />,
      items: [
        "Renovação civilizacional em curso",
        "Nova elite intelectual formada",
        "Cultura restaurada e revitalizada",
        "Futuro glorioso realizado"
      ]
    }
  ];

  const pillars = [
    {
      title: "Comunidade Intelectual",
      description: "Rede de jovens talentos comprometidos com a excelência",
      icon: "🎓"
    },
    {
      title: "Produção Cultural",
      description: "Criação de contra-hegemonia cultural de qualidade",
      icon: "📚"
    },
    {
      title: "Formação de Lideranças",
      description: "Preparação da nova elite para assumir responsabilidades",
      icon: "👑"
    },
    {
      title: "Transmissão da Tradição",
      description: "Preservação e renovação do legado civilizacional",
      icon: "🔥"
    }
  ];

  return (
    <main className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span>VISÃO DE FUTURO</span>
            <div className={styles.heroDivider}></div>
          </div>
          
          <h1 className={styles.heroTitle}>
            O Futuro é Glorioso
          </h1>
          
          <p className={styles.heroSubtitle}>
            Não somos refugiados da decadência, somos construtores da glória. 
            Não observamos o colapso, preparamos o renascimento.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timeline}>
        <div className={styles.sectionHeader}>
          <Calendar size={32} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>A Escala da Glória</h2>
          <p className={styles.sectionSubtitle}>
            Nossa visão não é um sonho distante, mas um plano estruturado e executável
          </p>
        </div>
        
        <div className={styles.timelineContainer}>
          {timeline.map((phase, index) => (
            <div key={index} className={styles.timelinePhase}>
              <div className={styles.phaseHeader}>
                <div className={styles.phaseIcon}>{phase.icon}</div>
                <div className={styles.phaseYear}>{phase.year}</div>
              </div>
              
              <div className={styles.phaseContent}>
                <h3 className={styles.phaseTitle}>{phase.title}</h3>
                
                <ul className={styles.phaseList}>
                  {phase.items.map((item, idx) => (
                    <li key={idx} className={styles.phaseItem}>
                      <div className={styles.itemBullet}></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className={styles.phaseBorder}></div>
              </div>
              
              {index < timeline.length - 1 && (
                <div className={styles.timelineConnector}>
                  <div className={styles.connectorLine}></div>
                  <div className={styles.connectorArrow}>↓</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className={styles.pillars}>
        <div className={styles.sectionHeader}>
          <Target size={32} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Pilares da Transformação</h2>
          <p className={styles.sectionSubtitle}>
            As quatro dimensões através das quais operaremos nossa missão
          </p>
        </div>
        
        <div className={styles.pillarsGrid}>
          {pillars.map((pillar, index) => (
            <div key={index} className={styles.pillarCard}>
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIcon}>{pillar.icon}</div>
                <div className={styles.pillarNumber}>0{index + 1}</div>
              </div>
              
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarDescription}>{pillar.description}</p>
              
              <div className={styles.pillarBorder}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Vision */}
      <section className={styles.finalVision}>
        <div className={styles.visionContent}>
          <div className={styles.visionQuote}>
            <div className={styles.quoteMark}>"</div>
            <p className={styles.quoteText}>
              O futuro não pertence aos que reclamam. Pertence aos que constroem.
              O futuro não pertence aos que seguem a corrente. Pertence aos que nadam contra ela.
              O futuro não é um presente que receberemos. É uma obra que construiremos.
              E essa obra será gloriosa.
            </p>
          </div>
          
          <div className={styles.visionCall}>
            <h2 className={styles.callTitle}>Assuma seu Papel</h2>
            <p className={styles.callText}>
              Você não é um espectador da história. Você é um agente da transformação.
              Escolha ser parte da construção do futuro glorioso.
            </p>
            
            <div className={styles.callButtons}>
              <Link href="/manifesto/assinar" className={styles.callButtonPrimary}>
                Junte-se a Nós
              </Link>
              <Link href="/manifesto" className={styles.callButtonSecondary}>
                Ler Manifesto Completo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}