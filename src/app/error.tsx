// src/app/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.css';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Erro detectado:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      {/* Cracked glass effect overlay */}
      <div className={styles.crackedGlass}>
        <div className={styles.crackedCircle1}></div>
        <div className={styles.crackedCircle2}></div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={`${styles.errorContainer} ${styles.fadeIn}`}>
          {/* Error icon */}
          <div className={styles.errorIconWrapper}>
            <div className={styles.errorIconContainer}>
              <div className={styles.errorIconCircle}>
                <svg className={styles.errorIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className={styles.errorIconBadge}>
                <span className={styles.errorIconBadgeText}>!</span>
              </div>
            </div>
          </div>

          {/* Error title */}
          <h1 className={`${styles.errorTitle} ${styles.textCenter}`}>
            Erro Inesperado no Templo do Conhecimento
          </h1>

          {/* Error description */}
          <div className={`${styles.errorDescription} ${styles.fadeInUp}`}>
            <p className={styles.errorMessage}>
              Um imprevisto perturbou a harmonia intelectual que buscamos. 
              Nossos sábios já foram alertados para investigar este contratempo.
            </p>
            
            {error.message && (
              <div className={styles.errorDetails}>
                <div className={styles.errorDetailsLabel}>Detalhes técnicos:</div>
                <code className={styles.errorCode}>
                  {error.message}
                </code>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className={`${styles.actionButtons} ${styles.fadeInUp}`}>
            <button
              onClick={reset}
              className={styles.primaryButton}
            >
              <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reconstruir o Portal
            </button>

            <Link
              href="/"
              className={styles.secondaryButton}
            >
              <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Retornar à Cidadela
            </Link>
          </div>

          {/* Help text */}
          <div className={`${styles.helpText} ${styles.fadeInUp}`}>
            <div className={styles.helpContent}>
              <div className={styles.helpMessage}>
                Se o erro persistir, contate nossos arquivistas:
              </div>
              <div className={styles.helpLinks}>
                <Link 
                  href="/artigos" 
                  className={styles.helpLink}
                >
                  Biblioteca
                </Link>
                <span className={styles.linkSeparator}>•</span>
                <Link 
                  href="/manifesto" 
                  className={styles.helpLink}
                >
                  Doutrina
                </Link>
                <span className={styles.linkSeparator}>•</span>
                <Link 
                  href="/plataformas" 
                  className={styles.helpLink}
                >
                  Fóruns
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative footer */}
        <div className={`${styles.footer} ${styles.fadeInUp}`}>
          <div className={styles.footerText}>
            <svg className={styles.footerIcon} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Aristocracia Intellectualis • Erro registrado
          </div>
        </div>
      </div>
    </div>
  );
}