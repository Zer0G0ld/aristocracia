// src/app/not-found.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={`${styles.content} ${styles.textCenter}`}>
        {/* Error number with golden effect */}
        <div className={styles.errorNumber}>404</div>

        {/* Main content */}
        <div className={styles.glassEffect}>
          <h1 className={styles.title}>Página Perdida nas Sombras</h1>
          
          <p className={`${styles.description} ${styles.lead}`}>
            A sabedoria que você busca migrou para outras bibliotecas do conhecimento. 
            Talvez tenha sido arquivada nos anais do tempo ou ainda está sendo forjada 
            nas forjas intelectuais da Aristocracia.
          </p>

          <div className={styles.divider}></div>

          <div className={styles.actions}>
            <Link 
              href="/" 
              className={styles.primaryButton}
            >
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retornar ao Panteon
            </Link>

            <Link 
              href="/manifesto" 
              className={styles.secondaryButton}
            >
              Explorar o Manifesto
            </Link>
          </div>
        </div>

        {/* Quick navigation */}
        <div className={styles.quickNav}>
          {[
            { href: '/artigos', label: 'Artigos', desc: 'Sabedoria Acadêmica' },
            { href: '/porta-vozes', label: 'Porta-vozes', desc: 'Vozes da Aristocracia' },
            { href: '/producao-intelectual', label: 'Produção', desc: 'Obras Primas' },
            { href: '/plataformas', label: 'Plataformas', desc: 'Fóruns do Conhecimento' }
          ].map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={styles.navItem}
            >
              <div className={styles.navItemTitle}>{item.label}</div>
              <div className={styles.navItemDesc}>{item.desc}</div>
            </Link>
          ))}
        </div>

        {/* Decorative quote */}
        <div className={styles.quoteSection}>
          <blockquote className={styles.quote}>
            "O verdadeiro conhecimento não se perde, apenas aguarda ser redescoberto 
            por mentes preparadas para recebê-lo."
          </blockquote>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollCircle}>
          <div className={styles.scrollDot}></div>
        </div>
      </div>
    </div>
  );
}