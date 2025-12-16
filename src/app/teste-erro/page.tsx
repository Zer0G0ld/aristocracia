// src/app/teste-erro/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './teste-erro.module.css';

export default function TesteErroPage() {
  const [simulateError, setSimulateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (simulateError) {
    throw new Error(errorMessage || 'Erro simulado para teste da página de erro');
  }

  const handleSimulateError = (type: string) => {
    switch (type) {
      case 'api':
        setErrorMessage('Erro na API: Falha ao buscar dados dos arquivos intelectuais');
        break;
      case 'network':
        setErrorMessage('Erro de rede: Conexão com o servidor de conhecimento perdida');
        break;
      case 'validation':
        setErrorMessage('Erro de validação: Os pergaminhos não passaram no teste de autenticidade');
        break;
      case 'custom':
        setErrorMessage('Erro personalizado: Teste da página de erro da Aristocracia');
        break;
      default:
        setErrorMessage('');
    }
    setSimulateError(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Teste do Sistema de Erros</h1>
          <p className={styles.subtitle}>
            Laboratório de Contingências da Aristocracia Intellectualis
          </p>
        </div>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Propósito</h2>
            <p className={styles.cardText}>
              Esta página permite simular diferentes cenários de erro para testar a resiliência 
              e a experiência de usuário quando ocorrem falhas no sistema.
            </p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Funcionalidades Testadas</h2>
            <ul className={styles.list}>
              <li>Página de erro (<code>error.tsx</code>)</li>
              <li>Reset de erros com o botão "Reconstruir o Portal"</li>
              <li>Redirecionamento para páginas principais</li>
              <li>Exibição de mensagens de erro detalhadas</li>
            </ul>
          </div>
        </div>

        {/* Error Simulation Section */}
        <div className={styles.simulationSection}>
          <h2 className={styles.sectionTitle}>Simular Erros</h2>
          <p className={styles.sectionDescription}>
            Clique em um dos botões abaixo para simular diferentes tipos de erros:
          </p>

          <div className={styles.buttonGrid}>
            <button
              onClick={() => handleSimulateError('api')}
              className={`${styles.errorButton} ${styles.apiError}`}
            >
              <div className={styles.buttonIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className={styles.buttonContent}>
                <div className={styles.buttonTitle}>Erro de API</div>
                <div className={styles.buttonDescription}>
                  Simula falha na comunicação com servidores
                </div>
              </div>
            </button>

            <button
              onClick={() => handleSimulateError('network')}
              className={`${styles.errorButton} ${styles.networkError}`}
            >
              <div className={styles.buttonIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <div className={styles.buttonContent}>
                <div className={styles.buttonTitle}>Erro de Rede</div>
                <div className={styles.buttonDescription}>
                  Simula problemas de conectividade
                </div>
              </div>
            </button>

            <button
              onClick={() => handleSimulateError('validation')}
              className={`${styles.errorButton} ${styles.validationError}`}
            >
              <div className={styles.buttonIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className={styles.buttonContent}>
                <div className={styles.buttonTitle}>Erro de Validação</div>
                <div className={styles.buttonDescription}>
                  Simula dados inválidos ou corrompidos
                </div>
              </div>
            </button>

            <button
              onClick={() => handleSimulateError('custom')}
              className={`${styles.errorButton} ${styles.customError}`}
            >
              <div className={styles.buttonIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className={styles.buttonContent}>
                <div className={styles.buttonTitle}>Erro Personalizado</div>
                <div className={styles.buttonDescription}>
                  Simula erro genérico para testes
                </div>
              </div>
            </button>
          </div>

          <div className={styles.note}>
            <div className={styles.noteIcon}>⚠️</div>
            <p className={styles.noteText}>
              <strong>Atenção:</strong> Ao clicar em qualquer botão acima, a página atual será 
              substituída pela página de erro (<code>error.tsx</code>). Use o botão "Reconstruir 
              o Portal" na página de erro para retornar aqui.
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className={styles.navigationSection}>
          <h2 className={styles.sectionTitle}>Navegação</h2>
          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>
              <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Voltar para Home
            </Link>

            <Link href="/artigos" className={styles.navLink}>
              <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Ver Artigos
            </Link>

            <Link href="/manifesto" className={styles.navLink}>
              <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Ler Manifesto
            </Link>
          </div>
        </div>

        {/* Info Footer */}
        <div className={styles.infoFooter}>
          <p className={styles.infoText}>
            <strong>Informação técnica:</strong> Esta página é um Client Component que força erros 
            para testar o boundary de erro do Next.js. O erro será capturado pelo <code>error.tsx</code> 
            na raiz do aplicativo.
          </p>
          <div className={styles.infoTags}>
            <span className={styles.infoTag}>Next.js 14</span>
            <span className={styles.infoTag}>Error Boundary</span>
            <span className={styles.infoTag}>Client Component</span>
            <span className={styles.infoTag}>Testes</span>
          </div>
        </div>
      </div>
    </div>
  );
}