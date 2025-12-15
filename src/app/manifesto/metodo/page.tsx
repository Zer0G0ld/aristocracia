// src/app/manifesto/metodo/page.tsx
import styles from './page.module.css';
import { BookOpen, Users, PenTool, Target, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function MetodoPage() {
  const cycles = [
    {
      time: "Manhã",
      title: "Estudar",
      icon: <BookOpen size={32} />,
      color: "#e9cd7a",
      activities: [
        "Leitura dos clássicos fundamentais",
        "Análise da realidade contemporânea",
        "Formação técnica especializada",
        "Reflexão pessoal e anotações"
      ],
      duration: "2-3 horas diárias"
    },
    {
      time: "Tarde",
      title: "Debater",
      icon: <Users size={32} />,
      color: "#b8860b",
      activities: [
        "Discussão rigorosa em grupo",
        "Refutação de erros e sofismas",
        "Refinamento de ideias e conceitos",
        "Prática da retórica e dialética"
      ],
      duration: "1-2 horas diárias"
    },
    {
      time: "Noite",
      title: "Produzir",
      icon: <PenTool size={32} />,
      color: "#daa520",
      activities: [
        "Escrita de ensaios e artigos",
        "Criação de conteúdo intelectual",
        "Desenvolvimento de projetos",
        "Documentação do aprendizado"
      ],
      duration: "2-3 horas diárias"
    },
    {
      time: "Sempre",
      title: "Agir",
      icon: <Target size={32} />,
      color: "#cd853f",
      activities: [
        "Intervenção na realidade social",
        "Formação de novos membros",
        "Construção de instituições",
        "Influência no debate público"
      ],
      duration: "Contínuo"
    }
  ];

  const disciplines = [
    {
      title: "Leitura Dirigida",
      description: "Bibliografia essencial com guia de estudo",
      hours: "10h/semana"
    },
    {
      title: "Seminários",
      description: "Debates guiados por tópicos específicos",
      hours: "4h/semana"
    },
    {
      title: "Escrita Acadêmica",
      description: "Produção de ensaios e artigos revisados",
      hours: "6h/semana"
    },
    {
      title: "Prática de Retórica",
      description: "Treinamento de discurso e argumentação",
      hours: "3h/semana"
    }
  ];

  return (
    <main className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span>MÉTODO DE AÇÃO</span>
            <div className={styles.heroDivider}></div>
          </div>
          
          <h1 className={styles.heroTitle}>
            O Ciclo da Excelência
          </h1>
          
          <p className={styles.heroSubtitle}>
            Não basta ter boas intenções. É preciso método, disciplina e ação consistente.
            Aqui está como transformamos ideias em realidade.
          </p>
        </div>
      </section>

      {/* Cycles */}
      <section className={styles.cycles}>
        <div className={styles.sectionHeader}>
          <Clock size={32} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>O Ciclo Diário da Excelência</h2>
          <p className={styles.sectionSubtitle}>
            Uma metodologia estruturada que combina estudo, debate, produção e ação
          </p>
        </div>
        
        <div className={styles.cyclesGrid}>
          {cycles.map((cycle, index) => (
            <div key={index} className={styles.cycleCard}>
              <div className={styles.cycleHeader}>
                <div className={styles.cycleTime}>
                  <Clock size={20} />
                  <span>{cycle.time}</span>
                </div>
                <div 
                  className={styles.cycleIcon}
                  style={{ color: cycle.color }}
                >
                  {cycle.icon}
                </div>
              </div>
              
              <h3 className={styles.cycleTitle}>{cycle.title}</h3>
              
              <ul className={styles.cycleList}>
                {cycle.activities.map((activity, idx) => (
                  <li key={idx} className={styles.cycleItem}>
                    <CheckCircle size={16} className={styles.itemIcon} />
                    {activity}
                  </li>
                ))}
              </ul>
              
              <div className={styles.cycleDuration}>
                <span>Duração:</span>
                <strong>{cycle.duration}</strong>
              </div>
              
              <div 
                className={styles.cycleBorder}
                style={{ backgroundColor: cycle.color }}
              ></div>
            </div>
          ))}
        </div>
      </section>

      {/* Disciplines */}
      <section className={styles.disciplines}>
        <div className={styles.sectionHeader}>
          <Target size={32} className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Disciplinas de Formação</h2>
          <p className={styles.sectionSubtitle}>
            O programa estrutural que garante desenvolvimento consistente e progressivo
          </p>
        </div>
        
        <div className={styles.disciplinesGrid}>
          {disciplines.map((discipline, index) => (
            <div key={index} className={styles.disciplineCard}>
              <div className={styles.disciplineHeader}>
                <div className={styles.disciplineNumber}>0{index + 1}</div>
                <div className={styles.disciplineHours}>{discipline.hours}</div>
              </div>
              
              <h3 className={styles.disciplineTitle}>{discipline.title}</h3>
              <p className={styles.disciplineDescription}>{discipline.description}</p>
              
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${(index + 1) * 25}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className={styles.process}>
        <div className={styles.processContent}>
          <h2 className={styles.processTitle}>O Processo de Admissão</h2>
          
          <div className={styles.processSteps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Estudo Inicial</h3>
              <p className={styles.stepDescription}>
                30 dias de leituras fundamentais e reflexões
              </p>
            </div>
            
            <div className={styles.stepConnector}></div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Produção</h3>
              <p className={styles.stepDescription}>
                Redação de ensaio sobre os princípios do movimento
              </p>
            </div>
            
            <div className={styles.stepConnector}></div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Debate</h3>
              <p className={styles.stepDescription}>
                Participação em seminário de discussão com membros
              </p>
            </div>
            
            <div className={styles.stepConnector}></div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h3 className={styles.stepTitle}>Admissão</h3>
              <p className={styles.stepDescription}>
                Avaliação final e juramento de compromisso
              </p>
            </div>
          </div>
          
          <div className={styles.processNote}>
            <p>
              <strong>Nota:</strong> O processo é rigoroso por design. 
              Buscamos não quantidade, mas qualidade. Não seguidores, mas construtores.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Pronto para o Desafio?</h2>
          <p className={styles.ctaText}>
            Este método não é para todos. É para aqueles que estão dispostos 
            a pagar o preço da excelência. Se você é um deles, comece agora.
          </p>
          
          <div className={styles.ctaButtons}>
            <Link href="/formacao/iniciar" className={styles.ctaButtonPrimary}>
              Iniciar Formação
            </Link>
            <Link href="/manifesto" className={styles.ctaButtonSecondary}>
              Ver Manifesto Completo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}