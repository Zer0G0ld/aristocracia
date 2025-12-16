// src/app/votacao/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Clock, 
  CheckCircle, 
  Users, 
  Shield, 
  Award,
  Calendar,
  TrendingUp,
  BarChart3,
  Vote,
  MessageSquare,
  Target,
  Zap
} from 'lucide-react';
import styles from './page.module.css';

interface PollOption {
  id: string;
  title: string;
  description: string;
  votes: number;
}

interface PollHistory {
  id: number;
  date: string;
  topic: string;
  winner: string;
  totalVotes: number;
}

export default function VotacaoPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 25,
    seconds: 47,
  });

  const [currentPoll, setCurrentPoll] = useState<PollOption[]>([
    {
      id: 'opcao1',
      title: 'Análise Política Nacional',
      description: 'Discussão profunda sobre cenário político brasileiro, eleições e estratégias conservadoras',
      votes: 156,
    },
    {
      id: 'opcao2',
      title: 'Crítica Cultural e Artística',
      description: 'Análise de produções culturais contemporâneas e sua influência na sociedade',
      votes: 89,
    },
    {
      id: 'opcao3',
      title: 'Tecnologia e Inovação Conservadora',
      description: 'Como a tecnologia pode servir aos valores tradicionais e à ordem',
      votes: 112,
    },
    {
      id: 'opcao4',
      title: 'Filosofia e Ética Aristocrática',
      description: 'Discussões sobre virtude, excelência e responsabilidade da elite intelectual',
      votes: 78,
    },
  ]);

  const pollHistory: PollHistory[] = [
    {
      id: 1,
      date: '15-21 Jan 2024',
      topic: 'Reforma Educacional: Tradição vs Modernidade',
      winner: 'Tradição com Inovação',
      totalVotes: 423,
    },
    {
      id: 2,
      date: '8-14 Jan 2024',
      topic: 'Estratégias de Comunicação Conservadora',
      winner: 'Mídias Alternativas',
      totalVotes: 387,
    },
    {
      id: 3,
      date: '1-7 Jan 2024',
      topic: 'Prioridades para 2024',
      winner: 'Formação de Lideranças',
      totalVotes: 512,
    },
  ];

  const totalVotes = currentPoll.reduce((sum, option) => sum + option.votes, 0);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    
    setSelectedOption(optionId);
    setHasVoted(true);
    
    // Simular votação no servidor
    setCurrentPoll(prev => 
      prev.map(option => 
        option.id === optionId 
          ? { ...option, votes: option.votes + 1 }
          : option
      )
    );

    // Salvar no localStorage para persistência
    localStorage.setItem('hasVoted', 'true');
    localStorage.setItem('selectedOption', optionId);
  };

  useEffect(() => {
    // Verificar se já votou
    const hasVotedBefore = localStorage.getItem('hasVoted');
    const selectedOptionBefore = localStorage.getItem('selectedOption');
    
    if (hasVotedBefore === 'true') {
      setHasVoted(true);
      setSelectedOption(selectedOptionBefore);
    }

    // Timer para a votação
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) {
          return { ...prev, seconds: newSeconds };
        }
        
        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) {
          return { ...prev, minutes: newMinutes, seconds: 59 };
        }
        
        const newHours = prev.hours - 1;
        if (newHours >= 0) {
          return { ...prev, hours: newHours, minutes: 59, seconds: 59 };
        }
        
        const newDays = prev.days - 1;
        if (newDays >= 0) {
          return { ...prev, days: newDays, hours: 23, minutes: 59, seconds: 59 };
        }
        
        return prev; // Votação encerrada
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getPercentage = (votes: number) => {
    return totalVotes ? Math.round((votes / totalVotes) * 100) : 0;
  };

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Deliberação Aristocrática</h1>
        <p className={styles.pageSubtitle}>
          Participe das decisões que moldam o futuro do movimento. 
          Sua voz conta na construção da renovação civilizacional.
        </p>
      </header>

      {/* Voting Timer */}
      <div className={styles.votingTimer}>
        <div className={styles.timerTitle}>
          <Clock size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          Votação encerra em:
        </div>
        <div className={styles.timerDisplay}>
          {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:
          {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </div>
        <div className={styles.timerLabel}>
          <span>Dias</span>
          <span>Horas</span>
          <span>Minutos</span>
          <span>Segundos</span>
        </div>
      </div>

      {/* Main Voting Section */}
      <section className={styles.votingSection}>
        <div className={styles.poll}>
          <div className={styles.pollHeader}>
            <h2 className={styles.pollTitle}>
              <Target size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
              Votação da Semana: Tema para Debate
            </h2>
            <p className={styles.pollDescription}>
              Escolha o tema que será debatido profundamente na próxima semana. 
              O vencedor definirá o foco intelectual da comunidade.
            </p>
          </div>

          <div className={styles.pollOptions}>
            {currentPoll.map((option, index) => {
              const percentage = getPercentage(option.votes);
              const isSelected = selectedOption === option.id;
              
              return (
                <div 
                  key={option.id} 
                  className={styles.pollOption}
                  style={{
                    borderColor: isSelected ? 'rgba(233, 205, 122, 0.4)' : undefined,
                    background: isSelected ? 'rgba(233, 205, 122, 0.05)' : undefined,
                  }}
                >
                  <div className={styles.pollOptionContent}>
                    <div className={styles.optionNumber}>
                      {index + 1}
                    </div>
                    
                    <div className={styles.optionText}>
                      <h3 className={styles.optionTitle}>{option.title}</h3>
                      <p className={styles.optionDescription}>{option.description}</p>
                    </div>
                    
                    <button
                      onClick={() => handleVote(option.id)}
                      disabled={hasVoted}
                      className={`${styles.voteButton} ${isSelected ? styles.voteButtonActive : ''}`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle size={16} style={{ marginRight: '8px' }} />
                          Votado
                        </>
                      ) : hasVoted ? (
                        'Já Votou'
                      ) : (
                        <>
                          <Vote size={16} style={{ marginRight: '8px' }} />
                          Votar
                        </>
                      )}
                    </button>
                  </div>

                  {/* Poll Bar */}
                  <div className={styles.pollBar}>
                    <div 
                      className={styles.pollFill} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  {/* Poll Stats */}
                  <div className={styles.pollStats}>
                    <div>
                      <span className={styles.voteCount}>{option.votes} votos</span>
                      {' • '}
                      <span className={styles.votePercentage}>{percentage}%</span>
                    </div>
                    {isSelected && (
                      <span style={{ color: '#e9cd7a', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <CheckCircle size={14} />
                        Sua escolha
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Votes */}
          <div className={styles.totalVotes}>
            <p className={styles.totalVotesText}>Total de votos na comunidade:</p>
            <div className={styles.totalVotesCount}>
              <Users size={28} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
              {totalVotes}
            </div>
          </div>
        </div>
      </section>

      {/* Voting Rules */}
      <section className={styles.votingRules}>
        <h3 className={styles.rulesTitle}>
          <Shield size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          Princípios da Deliberação
        </h3>
        
        <ul className={styles.rulesList}>
          <li className={styles.ruleItem}>
            <div className={styles.ruleIcon}>
              <Award size={20} />
            </div>
            <p className={styles.ruleText}>
              <strong>Um membro, um voto:</strong> Cada participante tem direito a um único voto por votação
            </p>
          </li>
          
          <li className={styles.ruleItem}>
            <div className={styles.ruleIcon}>
              <Calendar size={20} />
            </div>
            <p className={styles.ruleText}>
              <strong>Ciclo semanal:</strong> Novas votações são abertas toda segunda-feira
            </p>
          </li>
          
          <li className={styles.ruleItem}>
            <div className={styles.ruleIcon}>
              <TrendingUp size={20} />
            </div>
            <p className={styles.ruleText}>
              <strong>Transparência total:</strong> Resultados são publicados e implementados
            </p>
          </li>
          
          <li className={styles.ruleItem}>
            <div className={styles.ruleIcon}>
              <MessageSquare size={20} />
            </div>
            <p className={styles.ruleText}>
              <strong>Debate qualificado:</strong> Discussões fundamentadas no Discord
            </p>
          </li>
        </ul>
      </section>

      {/* Poll History */}
      <section className={styles.pollHistory}>
        <h3 className={styles.historyTitle}>
          <BarChart3 size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          Histórico de Votações
        </h3>
        
        <div className={styles.historyGrid}>
          {pollHistory.map((poll) => (
            <div key={poll.id} className={styles.historyCard}>
              <div className={styles.historyDate}>
                <Calendar size={14} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                {poll.date}
              </div>
              <h4 className={styles.historyTopic}>{poll.topic}</h4>
              <div className={styles.historyWinner}>
                <span className={styles.winnerBadge}>
                  <Trophy size={12} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                  Vencedor
                </span>
                {poll.winner} • {poll.totalVotes} votos
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h3 className={styles.ctaTitle}>Faça parte da tomada de decisão</h3>
        <p className={styles.ctaText}>
          Sua participação não se limita ao voto. Participe dos debates, 
          apresente propostas e ajude a moldar o futuro do movimento.
        </p>
        
        <div className={styles.ctaButtons}>
          <a 
            href="https://discord.gg/exemplo" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            <MessageSquare size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Participar do Debate
          </a>
          
          <a 
            href="/manifesto" 
            className={styles.ctaButton}
          >
            <Zap size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Conhecer os Princípios
          </a>
          
          <a 
            href="/artigos" 
            className={styles.ctaButton}
          >
            <Target size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Ver Análises Anteriores
          </a>
        </div>
      </section>

      {/* Stats */}
      <div className={styles.totalVotes} style={{ marginTop: '2rem' }}>
        <p className={styles.totalVotesText}>Estatísticas da Comunidade:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', color: '#e9cd7a', fontWeight: 'bold' }}>42</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>Votações Realizadas</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', color: '#e9cd7a', fontWeight: 'bold' }}>89%</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>Taxa de Participação</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', color: '#e9cd7a', fontWeight: 'bold' }}>156</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>Membros Ativos</div>
          </div>
        </div>
      </div>
    </div>
  );
}