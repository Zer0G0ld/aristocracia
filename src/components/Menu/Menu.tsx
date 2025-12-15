'use client';

// src/components/Menu/Menu.tsx
import styles from './Menu.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu as MenuIcon, X, ChevronDown } from 'lucide-react';

export default function Menu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    { 
      href: "/manifesto", 
      label: "Manifesto",
      submenu: [
        { href: "/manifesto/principios", label: "Princípios" },
        { href: "/manifesto/visao", label: "Visão" },
        { href: "/manifesto/metodo", label: "Método" }
      ]
    },
    { 
      href: "/producao-intelectual", 
      label: "Produção Intelectual",
      submenu: [
        { href: "/producao/livros", label: "Livros" },
        { href: "/producao/ensaios", label: "Ensaios" },
        { href: "/producao/estudos", label: "Estudos" }
      ]
    },
    { 
      href: "/artigos", 
      label: "Artigos",
      submenu: [
        { href: "/artigos/politica", label: "Política" },
        { href: "/artigos/filosofia", label: "Filosofia" },
        { href: "/artigos/cultura", label: "Cultura" },
        { href: "/artigos/historia", label: "História" }
      ]
    },
    { 
      href: "/porta-vozes", 
      label: "Porta-vozes",
      submenu: [
        { href: "/porta-vozes/biografias", label: "Biografias" },
        { href: "/porta-vozes/discursos", label: "Discursos" },
        { href: "/porta-vozes/entrevistas", label: "Entrevistas" }
      ]
    },
    { 
      href: "/votacao", 
      label: "Deliberação",
      submenu: [
        { href: "/votacao/participar", label: "Participar" },
        { href: "/votacao/resultados", label: "Resultados" },
        { href: "/votacao/arquivo", label: "Arquivo" }
      ]
    }
  ];

  return (
    <header className={styles.menu}>
      {/* Elemento decorativo superior */}
      <div className={styles.decorativeTop}></div>
      
      <div className={styles.menuContainer}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoImage}>
              <Image 
                src="/icons/HD.png"
                alt="Hub Direitista"
                width={60}
                height={60}
                className={styles.logoImg}
                priority
              />
              <div className={styles.logoGlow}></div>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>HUB DIREITISTA</span>
              <span className={styles.logoSubtitle}>O Futuro é Glorioso</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <li 
                key={item.href}
                className={styles.navItem}
                onMouseEnter={() => setActiveDropdown(item.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                  {item.submenu && (
                    <ChevronDown className={styles.dropdownIcon} size={16} />
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {item.submenu && (
                  <div 
                    className={`${styles.dropdown} ${activeDropdown === item.href ? styles.dropdownActive : ''}`}
                  >
                    <div className={styles.dropdownContainer}>
                      <div className={styles.dropdownHeader}>
                        <span className={styles.dropdownTitle}>{item.label}</span>
                      </div>
                      <div className={styles.dropdownContent}>
                        {item.submenu.map((subItem) => (
                          <Link 
                            key={subItem.href}
                            href={subItem.href}
                            className={styles.dropdownLink}
                          >
                            <div className={styles.dropdownIconSmall}>›</div>
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <X className={styles.menuIcon} size={28} />
          ) : (
            <MenuIcon className={styles.menuIcon} size={28} />
          )}
        </button>

        {/* Mobile Navigation */}
        <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavActive : ''}`}>
          <div className={styles.mobileNavContent}>
            <div className={styles.mobileNavHeader}>
              <span className={styles.mobileNavTitle}>Navegação</span>
            </div>
            <ul className={styles.mobileNavList}>
              {menuItems.map((item) => (
                <li key={item.href} className={styles.mobileNavItem}>
                  <Link 
                    href={item.href}
                    className={styles.mobileNavLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <div className={styles.mobileSubmenu}>
                      {item.submenu.map((subItem) => (
                        <Link 
                          key={subItem.href}
                          href={subItem.href}
                          className={styles.mobileSubmenuLink}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          › {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className={styles.mobileNavFooter}>
              <span className={styles.mobileFooterText}>
                Assume a responsabilidade
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Elemento decorativo inferior */}
      <div className={styles.decorativeBottom}></div>
    </header>
  );
}