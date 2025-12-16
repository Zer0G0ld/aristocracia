'use client';

// src/components/Menu/Menu.tsx - Versão Corrigida
import styles from './Menu.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu as MenuIcon, X, ChevronDown } from 'lucide-react';

export default function Menu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        closeButtonRef.current &&
        !closeButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileSubmenu = (href: string) => {
    setExpandedMobileItems(prev => {
      // Fecha todos os outros submenus e abre/alterna o atual
      if (prev.includes(href)) {
        return prev.filter(item => item !== href);
      } else {
        return [href]; // Mantém apenas um aberto de cada vez
      }
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedMobileItems([]); // Fecha todos os submenus
  };

  const handleMobileLinkClick = (href: string, hasSubmenu: boolean, e: React.MouseEvent) => {
    if (hasSubmenu) {
      e.preventDefault();
      toggleMobileSubmenu(href);
    } else {
      closeMobileMenu();
    }
  };

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
    },
    {
      href: "/plataformas",
      label: "Plataformas",
    }
  ];

  return (
    <>
      <header className={`${styles.menu} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.decorativeTop}></div>
        
        <div className={styles.menuContainer}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logoLink} onClick={closeMobileMenu}>
              <div className={styles.logoImage}>
                <Image 
                  src="/icons/testes/HD.png"
                  alt="Aristocracia Logo"
                  width={52}
                  height={52}
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
                              onClick={closeMobileMenu}
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
            ref={closeButtonRef}
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={isMobileMenuOpen}
          >
            <MenuIcon className={styles.menuIcon} size={24} />
            <div className={styles.mobileNotification}></div>
          </button>
        </div>

        <div className={styles.decorativeBottom}></div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`${styles.mobileNavBackdrop} ${isMobileMenuOpen ? styles.mobileNavBackdropActive : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation */}
      <div 
        ref={mobileMenuRef}
        className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavActive : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className={styles.mobileNavHeader}>
          <span className={styles.mobileNavTitle}>Menu</span>
          <button 
            className={styles.mobileCloseButton}
            onClick={closeMobileMenu}
            aria-label="Fechar menu"
            ref={closeButtonRef}
          >
            <X size={22} />
          </button>
        </div>
        
        <div className={styles.mobileNavContent}>
          <ul className={styles.mobileNavList}>
            {menuItems.map((item, index) => (
              <li 
                key={item.href} 
                className={styles.mobileNavItem}
                style={{ '--item-index': index } as React.CSSProperties}
              >
                <div className={styles.mobileNavLink}>
                  <Link 
                    href={item.href}
                    onClick={(e) => handleMobileLinkClick(item.href, !!item.submenu, e)}
                    aria-expanded={expandedMobileItems.includes(item.href)}
                    aria-controls={`submenu-${item.href.replace('/', '-')}`}
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <button 
                      className={`${styles.mobileSubmenuToggle} ${expandedMobileItems.includes(item.href) ? styles.mobileSubmenuToggleActive : ''}`}
                      onClick={() => toggleMobileSubmenu(item.href)}
                      aria-label={`${expandedMobileItems.includes(item.href) ? 'Recolher' : 'Expandir'} submenu de ${item.label}`}
                      aria-expanded={expandedMobileItems.includes(item.href)}
                      aria-controls={`submenu-${item.href.replace('/', '-')}`}
                    >
                      <ChevronDown size={18} />
                    </button>
                  )}
                </div>
                
                {item.submenu && (
                  <div 
                    id={`submenu-${item.href.replace('/', '-')}`}
                    className={`${styles.mobileSubmenu} ${expandedMobileItems.includes(item.href) ? styles.mobileSubmenuActive : ''}`}
                    role="region"
                    aria-labelledby={`button-${item.href.replace('/', '-')}`}
                  >
                    {item.submenu.map((subItem) => (
                      <Link 
                        key={subItem.href}
                        href={subItem.href}
                        className={styles.mobileSubmenuLink}
                        onClick={closeMobileMenu}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          
          <div className={styles.mobileNavFooter}>
            <span className={styles.mobileFooterText}>
              Assume a responsabilidade<br />
              Seja parte da transformação
            </span>
          </div>
        </div>
      </div>
    </>
  );
}