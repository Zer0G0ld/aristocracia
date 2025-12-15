// src/app/manifesto/page.tsx
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Users, Target, Shield, ArrowRight, Download, FileSignature } from 'lucide-react';

export default function ManifestoPage() {
  const principles = [
    {
      icon: <BookOpen size={32} />,
      title: "Formação",
      description: "Educação clássica, leitura dos mestres, desenvolvimento do caráter. Rejeitamos a doutrinação moderna.",
      color: "#e9cd7a",
      details: [
        "Leitura profunda dos clássicos",
        "Debate rigoroso e elevado",
        "Escrita precisa e fundamentada",
        "Desenvolvimento de caráter",
        "Excelência intelectual"
      ]
    },
    {
      icon: <Users size={32} />,
      title: "Hierarquia",
      description: "Meritocracia real, reconhecimento das diferenças naturais, autoridade baseada em conhecimento.",
      color: "#b8860b",
      details: [
        "Mérito demonstrado, não privilégio",
        "Liderança por conhecimento",
        "Respeito à excelência",
        "Responsabilidade proporcional",
        "Autoridade legítima"
      ]
    },
    {
      icon: <Shield size={32} />,
      title: "Responsabilidade",
      description: "Compromisso com o legado, dever para com o futuro, ação consciente e consequente.",
      color: "#daa520",
      details: [
        "Honra aos compromissos",
        "Serviço à comunidade",
        "Transmissão do legado",
        "Ação consequente",
        "Construção do futuro"
      ]
    }
  ];

  const vows = [
    "Dedicar minha mente ao estudo",
    "Meu caráter à excelência",
    "Minha vontade à ação",
    "Minha vida à reconstrução",
    "Até que o futuro glorioso seja presente"
  ];

  const nextSteps = [
    {
      title: "Assinar Digitalmente",
      description: "Junte-se formalmente ao movimento",
      icon: <FileSignature size={24} />,
      href: "/manifesto/assinar",
      buttonText: "Assinar Manifesto"
    },
    {
      title: "Iniciar Formação",
      description: "Comece seu programa de estudos",
      icon: <BookOpen size={24} />,
      href: "/formacao/iniciar",
      buttonText: "Começar Estudos"
    },
    {
      title: "Conhecer Membros",
      description: "Conecte-se com outros membros",
      icon: <Users size={24} />,
      href: "/comunidade/membros",
      buttonText: "Ver Comunidade"
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
            <span>MANIFESTO FUNDACIONAL</span>
            <div className={styles.heroDivider}></div>
          </div>
          
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleAccent}>O FUTURO É GLORIOSO</span>
            MANIFESTO Aristocracia
          </h1>
          
          <div className={styles.heroSeal}>
            <Image
              src="/icons/selo.svg"
              alt="Selo do Manifesto"
              width={120}
              height={120}
              className={styles.sealImage}
            />
            <div className={styles.sealGlow}></div>
          </div>
          
          <p className={styles.heroSubtitle}>
            A Declaração de Princípios, Métodos e Propósitos da Nova Vanguarda Intelectual
          </p>
          
          <div className={styles.heroActions}>
            <a href="#manifesto-content" className={styles.heroButton}>
              Ler Manifesto
              <ArrowRight size={20} />
            </a>
            <button className={styles.heroButtonSecondary}>
              <Download size={20} />
              PDF Completo
            </button>
          </div>
        </div>
      </section>

      {/* Manifesto Content */}
      <section id="manifesto-content" className={styles.content}>
        <div className={styles.contentWrapper}>
          
          {/* Preamble */}
          <article className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>I</span>
              <h2 className={styles.sectionTitle}>Preâmbulo: O Tempo da Decisão</h2>
            </div>
            
            <div className={styles.sectionContent}>
              <div className={styles.quote}>
                <div className={styles.quoteMark}>"</div>
                <p className={styles.quoteText}>
                  Estamos em uma encruzilhada civilizacional. O espírito de nosso tempo tornou-se um vento 
                  que sopra em direção ao nada - um progressivismo vazio, um igualitarismo nivelador, 
                  um niilismo vestido de virtude.
                </p>
                <div className={styles.quoteAuthor}>— Manifesto Hub Direitista</div>
              </div>
              
              <p className={styles.paragraph}>
                A decadência não é mais uma possibilidade, mas um diagnóstico. Observamos a corrosão da verdade 
                pelo relativismo militante, a destruição da excelência pelo culto da mediocridade, o esvaziamento 
                do significado pelo materialismo reducionista.
              </p>
              
              <p className={styles.paragraph}>
                Diante deste panorama, temos apenas duas opções: conformar-nos com a dissolução ou assumir 
                a responsabilidade da reconstrução. <strong>Escolhemos a reconstrução.</strong>
              </p>
              
              <div className={styles.warning}>
                <div className={styles.warningIcon}>!</div>
                <div className={styles.warningContent}>
                  <h3>Rejeitamos Firmemente:</h3>
                  <ul className={styles.warningList}>
                    <li>Marxismo Cultural e sua guerra contra a cultura</li>
                    <li>Globalismo desenraizado e apátrida</li>
                    <li>Tecnocratismo desumanizante</li>
                    <li>Niilismo valorativo</li>
                    <li>Cultura do cancelamento e censura</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* Principles */}
          <article className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>II</span>
              <h2 className={styles.sectionTitle}>Princípios Fundamentais</h2>
            </div>
            
            <div className={styles.sectionContent}>
              <div className={styles.principlesGrid}>
                {principles.map((principle, index) => (
                  <div key={index} className={styles.principleCard}>
                    <div 
                      className={styles.principleIcon}
                      style={{ color: principle.color }}
                    >
                      {principle.icon}
                      <div 
                        className={styles.principleIconGlow}
                        style={{ backgroundColor: `${principle.color}20` }}
                      ></div>
                    </div>
                    
                    <h3 className={styles.principleTitle}>
                      {principle.title}
                    </h3>
                    
                    <p className={styles.principleDescription}>
                      {principle.description}
                    </p>
                    
                    <ul className={styles.principleDetails}>
                      {principle.details.map((detail, idx) => (
                        <li key={idx} className={styles.principleDetail}>
                          <div 
                            className={styles.principleBullet}
                            style={{ backgroundColor: principle.color }}
                          ></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                    
                    <div 
                      className={styles.principleBorder}
                      style={{ backgroundColor: `${principle.color}40` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Vow */}
          <article className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>III</span>
              <h2 className={styles.sectionTitle}>Juramento de Adesão</h2>
            </div>
            
            <div className={styles.sectionContent}>
              <div className={styles.vowContainer}>
                <div className={styles.vowBackground}></div>
                
                <div className={styles.vowHeader}>
                  <Target size={32} className={styles.vowTargetIcon} />
                  <h3 className={styles.vowTitle}>Compromisso Solene</h3>
                </div>
                
                <div className={styles.vowText}>
                  <p className={styles.vowIntro}>
                    Eu, abaixo-assinado, solenemente juro:
                  </p>
                  
                  {vows.map((vow, index) => (
                    <div key={index} className={styles.vowLine}>
                      <div className={styles.vowNumber}>{index + 1}</div>
                      <p className={styles.vowContent}>{vow}</p>
                    </div>
                  ))}
                  
                  <p className={styles.vowConclusion}>
                    E que meu nome esteja entre os que ousaram construir.
                  </p>
                </div>
                
                <div className={styles.vowSignature}>
                  <div className={styles.signatureLine}></div>
                  <p className={styles.signatureLabel}>Assinatura Digital</p>
                </div>
              </div>
            </div>
          </article>

          {/* Next Steps */}
          <article className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>IV</span>
              <h2 className={styles.sectionTitle}>Próximos Passos</h2>
            </div>
            
            <div className={styles.sectionContent}>
              <div className={styles.stepsGrid}>
                {nextSteps.map((step, index) => (
                  <div key={index} className={styles.stepCard}>
                    <div className={styles.stepHeader}>
                      <div className={styles.stepIcon}>
                        {step.icon}
                      </div>
                      <div className={styles.stepNumber}>0{index + 1}</div>
                    </div>
                    
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                    
                    <Link href={step.href} className={styles.stepButton}>
                      {step.buttonText}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Final Call */}
          <article className={styles.finalCall}>
            <div className={styles.finalContent}>
              <h2 className={styles.finalTitle}>
                O Futuro Não é Dado — É Conquistado
              </h2>
              
              <p className={styles.finalText}>
                Esta não é apenas uma declaração de princípios. É um chamado à ação. 
                É um compromisso com a excelência. É uma promessa de glória.
              </p>
              
              <p className={styles.finalText}>
                O conformista vive sem perguntas. O crítico vive só de perguntas. 
                O <strong>construtor</strong> transforma perguntas em respostas, e respostas em realidades.
              </p>
              
              <div className={styles.finalActions}>
                <Link href="/manifesto/assinar" className={styles.finalButtonPrimary}>
                  Assinar Manifesto
                  <FileSignature size={20} />
                </Link>
                <Link href="/formacao/iniciar" className={styles.finalButtonSecondary}>
                  Iniciar Jornada
                  <ArrowRight size={20} />
                </Link>
              </div>
              
              <div className={styles.finalQuote}>
                <div className={styles.finalQuoteMark}>"</div>
                <p className={styles.finalQuoteText}>
                  A jornada de mil milhas começa com um único passo. 
                  O futuro glorioso começa com uma única decisão. 
                  <strong> Decida hoje.</strong>
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}