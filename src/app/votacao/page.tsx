'use client';

import { useState } from 'react';

export default function VotacaoPage() {
  const [votes, setVotes] = useState({
    opcao1: 0,
    opcao2: 0,
    opcao3: 0,
  });

  const handleVote = (opcao: keyof typeof votes) => {
    setVotes(prev => ({
      ...prev,
      [opcao]: prev[opcao] + 1
    }));
  };

  const totalVotes = votes.opcao1 + votes.opcao2 + votes.opcao3;

  return (
    <div className="container">
      <header className="page-header">
        <h1>Votação da Semana</h1>
        <p>Participe das decisões da comunidade</p>
      </header>

      <div className="voting-section">
        <div className="poll">
          <h2>Qual tema você gostaria de ver na próxima semana?</h2>
          
          <div className="poll-options">
            <div className="poll-option">
              <button onClick={() => handleVote('opcao1')}>
                Análise política nacional
              </button>
              <div className="poll-bar">
                <div 
                  className="poll-fill" 
                  style={{ width: totalVotes ? `${(votes.opcao1 / totalVotes) * 100}%` : '0%' }}
                ></div>
              </div>
              <span>{votes.opcao1} votos</span>
            </div>

            <div className="poll-option">
              <button onClick={() => handleVote('opcao2')}>
                Crítica cultural
              </button>
              <div className="poll-bar">
                <div 
                  className="poll-fill" 
                  style={{ width: totalVotes ? `${(votes.opcao2 / totalVotes) * 100}%` : '0%' }}
                ></div>
              </div>
              <span>{votes.opcao2} votos</span>
            </div>

            <div className="poll-option">
              <button onClick={() => handleVote('opcao3')}>
                Tecnologia e inovação
              </button>
              <div className="poll-bar">
                <div 
                  className="poll-fill" 
                  style={{ width: totalVotes ? `${(votes.opcao3 / totalVotes) * 100}%` : '0%' }}
                ></div>
              </div>
              <span>{votes.opcao3} votos</span>
            </div>
          </div>

          <p className="total-votes">Total: {totalVotes} votos</p>
        </div>
      </div>

      <div className="voting-rules">
        <h3>Como funciona:</h3>
        <ul>
          <li>As votações são semanais</li>
          <li>Cada membro tem direito a 1 voto</li>
          <li>O resultado define os temas da próxima semana</li>
          <li>Participe do debate no Discord</li>
        </ul>
      </div>
    </div>
  );
}