// src/components/Header/Header.tsx
import styles from './Header.module.css';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Header() {
  return (
    <header className={styles.header}>
      {/* Elementos decorativos de fundo */}
      <div className={styles.decorativeTop}></div>
      <div className={styles.decorativeBottom}></div>
      
      {/* Marca temporal */}
      <div className={styles.markContainer}>
        <span className={styles.markLine}></span>
        <span className={styles.mark}>MMXXVI</span>
        <span className={styles.markLine}></span>
      </div>

      {/* Título principal */}
      <div className={styles.titleContainer}>
        <div className={styles.mottoContainer}>
          <span className={styles.titleMotto}>O FUTURO É GLORIOSO</span>
          <div className={styles.divider}></div>
        </div>
        
        <h1 className={styles.title}>
          Aristocracia
          <Image 
            src="/icons/selo.svg" 
            alt="Selo O Futuro é Glorioso" 
            className={styles.selo}
            width={80}
            height={80}
            priority
          />
        </h1>
      </div>

      {/* Manifesto e subtítulo */}
      <div className={styles.manifestoContainer}>
        <p className={styles.manifesto}>
          Nadamos contra a corrente do tempo, não seguimos sua maré.
        </p>
        
        <div className={styles.quoteMark}>"</div>
        
        <p className={styles.subtitle}>
          Um círculo de jovens talentos que rejeita o conformismo, enfrenta a decadência política
          e assume a responsabilidade que gerações inteiras abandonaram.
        </p>
        <div className={styles.quoteMark}>"</div>
      </div>

      {/* Pilares fundamentais */}
      <div className={styles.pillars}>
        <div className={styles.pillar}>
          <div className={styles.pillarIcon}>Ⅰ</div>
          <span>Formação</span>
        </div>
        <div className={styles.pillar}>
          <div className={styles.pillarIcon}>Ⅱ</div>
          <span>Hierarquia</span>
        </div>
        <div className={styles.pillar}>
          <div className={styles.pillarIcon}>Ⅲ</div>
          <span>Responsabilidade</span>
        </div>
      </div>

      {/* Call to Action */}
      <div className={styles.ctaContainer}>
        <a href="/manifesto" className={styles.cta}>
          Iniciar Formação
          <ArrowRight className={styles.ctaIcon} size={16} />
        </a>
        <div className={styles.ctaSubtext}>
          Assuma seu papel na reconstrução civilizacional
        </div>
      </div>
    </header>
  );
}