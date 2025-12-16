// src/components/Footer/Footer.tsx
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        
        {/* Logo */}
        <a href="/" className={styles.logo}>
          Aristocracia
        </a>
        
        {/* Slogan */}
        <p className={styles.slogan}>
          O Futuro é Glorioso
        </p>
        
        {/* Linha sutil */}
        <div className={styles.divider}></div>
        
        {/* Princípios */}
        <ul className={styles.principles}>
          <li className={styles.principle}>Excelência</li>
          <li className={styles.principle}>Tradição</li>
          <li className={styles.principle}>Respeito</li>
          <li className={styles.principle}>Discernimento</li>
        </ul>
        
        {/* Copyright */}
        <p className={styles.copyright}>
          <span className={styles.copyrightText}>
            © {currentYear} Aristocracia
          </span>
          <span className={styles.tagline}>
            Para uma audiência seleta e exigente.
          </span>
        </p>
      </div>
    </footer>
  );
}