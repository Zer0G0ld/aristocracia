'use client';

import styles from './Menu.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Menu as MenuIcon, X, ChevronDown, Home, Crown, Shield, Scroll, Gem, Castle, BookOpen } from 'lucide-react';

// 🎯 Detecção específica para 1315×810
const isMediumDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1280 && window.innerWidth <= 1366;
};

interface SubMenuItem {
  href: string;
  label: string;
  badge?: string;
}

interface MenuItemType {
  href: string;
  label: string;
  icon?: React.ReactNode;
  submenu?: SubMenuItem[];
  highlight?: boolean;
}

interface MenuItemProps {
  item: MenuItemType;
  isMobile: boolean;
  onClose: () => void;
  expandedItems: string[];
  onToggleSubmenu: (href: string) => void;
}

const MenuItem = memo(({ 
  item, 
  isMobile, 
  onClose, 
  expandedItems, 
  onToggleSubmenu 
}: MenuItemProps) => (
  <li className={styles.navItem}>
    <Link 
      href={item.href}
      className={`${styles.navLink} ${item.highlight ? styles.navLinkHighlight : ''}`}
      onClick={(e) => {
        if (isMobile && item.submenu) {
          e.preventDefault();
          onToggleSubmenu(item.href);
        } else if (isMobile) {
          onClose();
        }
      }}
      aria-expanded={isMobile && item.submenu ? expandedItems.includes(item.href) : undefined}
    >
      {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
      <span className={styles.linkText}>{item.label}</span>
      {item.submenu && (
        <ChevronDown 
          className={`${styles.dropdownIcon} ${
            expandedItems.includes(item.href) ? styles.dropdownIconActive : ''
          }`} 
          size={16}
          aria-hidden="true"
        />
      )}
    </Link>
    
    {item.submenu && !isMobile && (
      <div className={styles.dropdown}>
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdownContent}>
            {item.submenu.map((subItem) => (
              <Link 
                key={subItem.href}
                href={subItem.href}
                className={styles.dropdownLink}
                onClick={onClose}
                prefetch={false}
              >
                <span className={styles.dropdownLinkText}>{subItem.label}</span>
                {subItem.badge && (
                  <span className={styles.dropdownBadge}>{subItem.badge}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )}
    
    {isMobile && item.submenu && expandedItems.includes(item.href) && (
      <div className={styles.mobileSubmenu}>
        {item.submenu.map((subItem) => (
          <Link 
            key={subItem.href}
            href={subItem.href}
            className={styles.mobileSubmenuLink}
            onClick={onClose}
            prefetch={false}
          >
            {subItem.label}
            {subItem.badge && (
              <span className={styles.mobileBadge}>{subItem.badge}</span>
            )}
          </Link>
        ))}
      </div>
    )}
  </li>
));

MenuItem.displayName = 'MenuItem';

export default function Menu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 📱 Detectar tamanho da janela
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
        setIsMediumScreen(width >= 1280 && width <= 1366);
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
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
        closeMobileMenu();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setExpandedMobileItems([]);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
    if (!isMobileMenuOpen) {
      setExpandedMobileItems([]);
    }
  }, [isMobileMenuOpen]);

  const toggleMobileSubmenu = useCallback((href: string) => {
    setExpandedMobileItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  }, []);

  // Menu items otimizados para 1315×810
  const getMenuItems = useCallback((): MenuItemType[] => {
    // Para telas médias (1280-1366) - específico para 1315×810
    if (isMediumScreen) {
      return [
        { href: "/", label: "Início", icon: <Home size={15} /> },
        { 
          href: "/manifesto", 
          label: "Manifesto",
          icon: <Scroll size={15} />,
          submenu: [
            { href: "/manifesto/principios", label: "Princípios", badge: "⚜️" },
            { href: "/manifesto/visao", label: "Visão", badge: "👑" },
            { href: "/manifesto/metodo", label: "Método", badge: "⚙️" },
            { href: "/manifesto/assinar", label: "Assinar", badge: "✍️" }
          ]
        },
        { 
          href: "/producao-intelectual", 
          label: "Intelectuais",
          icon: <BookOpen size={15} />,
          submenu: [
            { href: "/producao-intelectual", label: "Todos" },
            { href: "/producao-intelectual?category=filosofia", label: "Filósofos" },
            { href: "/producao-intelectual?category=historia", label: "Historiadores" }
          ]
        },
        { 
          href: "/artigos", 
          label: "Artigos",
          icon: <Gem size={15} />,
          submenu: [
            { href: "/artigos?category=politica", label: "Política" },
            { href: "/artigos?category=filosofia", label: "Filosofia" },
            { href: "/artigos?category=cultura", label: "Cultura" }
          ]
        },
        { 
          href: "/porta-vozes", 
          label: "Porta-vozes",
          icon: <Shield size={15} />
        },
        {
          href: "/votacao",
          label: "Votação",
          highlight: true,
          icon: <Crown size={15} />
        }
      ];
    }
    
    // Para telas pequenas (< 768)
    if (windowWidth < 768) {
      return [
        { href: "/", label: "Início", icon: <Home size={16} /> },
        { href: "/manifesto", label: "Manifesto", icon: <Scroll size={16} /> },
        { href: "/producao-intelectual", label: "Intelectuais", icon: <BookOpen size={16} /> },
        { href: "/artigos", label: "Artigos", icon: <Gem size={16} /> },
        { href: "/votacao", label: "Votação", icon: <Crown size={16} />, highlight: true }
      ];
    }
    
    // Desktop normal
    return [
      { 
        href: "/", 
        label: "Início",
        icon: <Home size={16} />
      },
      { 
        href: "/manifesto", 
        label: "Manifesto",
        icon: <Scroll size={16} />,
        submenu: [
          { href: "/manifesto/principios", label: "Princípios", badge: "⚜️" },
          { href: "/manifesto/visao", label: "Visão", badge: "👑" },
          { href: "/manifesto/metodo", label: "Método", badge: "⚙️" },
          { href: "/manifesto/assinar", label: "Assinar", badge: "✍️" },
          { href: "/manifesto/bibliografia", label: "Biblioteca", badge: "📚" }
        ]
      },
      { 
        href: "/producao-intelectual", 
        label: "Intelectuais",
        icon: <BookOpen size={16} />,
        submenu: [
          { href: "/producao-intelectual", label: "Todos os Membros" },
          { href: "/producao-intelectual?category=filosofia", label: "Filósofos" },
          { href: "/producao-intelectual?category=historia", label: "Historiadores" },
          { href: "/producao-intelectual?category=economia", label: "Economistas" },
          { href: "/producao-intelectual?featured=true", label: "Em Destaque" }
        ]
      },
      { 
        href: "/artigos", 
        label: "Artigos",
        icon: <Gem size={16} />,
        submenu: [
          { href: "/artigos?category=politica", label: "Política" },
          { href: "/artigos?category=filosofia", label: "Filosofia" },
          { href: "/artigos?category=cultura", label: "Cultura" },
          { href: "/artigos?category=historia", label: "História" },
          { href: "/artigos?featured=true", label: "Destaques" }
        ]
      },
      { 
        href: "/porta-vozes", 
        label: "Porta-vozes",
        icon: <Shield size={16} />,
        submenu: [
          { href: "/porta-vozes", label: "Todos" },
          { href: "/porta-vozes?category=midia-digital", label: "Mídia Digital" },
          { href: "/porta-vozes?featured=true", label: "Destaques" }
        ]
      },
      {
        href: "/plataformas",
        label: "Plataformas",
        icon: <Castle size={16} />
      },
      {
        href: "/votacao",
        label: "Deliberação",
        highlight: true,
        icon: <Crown size={16} />
      }
    ];
  }, [windowWidth, isMediumScreen]);

  const menuItems = getMenuItems();
  const showMobileMenu = windowWidth < 1024;

  return (
    <>
      <header 
        ref={menuRef}
        className={`${styles.menu} ${isScrolled ? styles.scrolled : ''} ${isMediumScreen ? styles.mediumScreen : ''}`}
        role="banner"
        aria-label="Navegação Principal"
      >
        <div className={styles.menuContainer}>
          {/* Logo otimizada para 1315×810 */}
          <div className={styles.logoContainer}>
            <Link 
              href="/" 
              className={styles.logoLink}
              onClick={closeMobileMenu}
              aria-label="Hub Direitista - Voltar ao início"
            >
              <div className={styles.logoImage}>
                <Image 
                  src="/icons/testes/HD.png"
                  alt="Hub Direitista"
                  width={isMediumScreen ? 44 : windowWidth < 768 ? 40 : 48}
                  height={isMediumScreen ? 44 : windowWidth < 768 ? 40 : 48}
                  className={styles.logoImg}
                  priority
                />
              </div>
              
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>
                  {isMediumScreen ? 'HUB DIR.' : 'HUB DIREITISTA'}
                </span>
                <span className={styles.logoSubtitle}>
                  {isMediumScreen ? 'Excelência' : 'O Futuro é Glorioso'}
                </span>
              </div>
            </Link>
          </div>

          {/* Navegação Desktop - Otimizada para 1315×810 */}
          {!showMobileMenu && (
            <nav 
              className={styles.desktopNav} 
              aria-label="Navegação Principal"
              role="navigation"
            >
              <ul className={styles.navList}>
                {menuItems.map((item, index) => (
                  <li 
                    key={`desktop-${item.href}-${index}`}
                    className={styles.navItem}
                    onMouseEnter={() => item.submenu && setActiveDropdown(item.href)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link 
                      href={item.href}
                      className={`${styles.navLink} ${item.highlight ? styles.navLinkHighlight : ''}`}
                      onFocus={() => item.submenu && setActiveDropdown(item.href)}
                      onBlur={() => setActiveDropdown(null)}
                    >
                      {isMediumScreen && item.icon && (
                        <span className={styles.navIcon}>{item.icon}</span>
                      )}
                      <span className={styles.linkText}>{item.label}</span>
                      {item.submenu && (
                        <ChevronDown 
                          className={`${styles.dropdownIcon} ${
                            activeDropdown === item.href ? styles.dropdownIconActive : ''
                          }`}
                          size={14}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                    
                    {item.submenu && (
                      <div 
                        className={`${styles.dropdown} ${
                          activeDropdown === item.href ? styles.dropdownActive : ''
                        }`}
                        onMouseEnter={() => setActiveDropdown(item.href)}
                        onMouseLeave={() => setActiveDropdown(null)}
                        role="menu"
                      >
                        <div className={styles.dropdownContainer}>
                          <div className={styles.dropdownContent}>
                            {item.submenu.map((subItem, subIndex) => (
                              <Link 
                                key={`sub-${subItem.href}-${subIndex}`}
                                href={subItem.href}
                                className={styles.dropdownLink}
                                onClick={closeMobileMenu}
                                role="menuitem"
                                prefetch={false}
                              >
                                <span className={styles.dropdownLinkText}>{subItem.label}</span>
                                {subItem.badge && (
                                  <span className={styles.dropdownBadge}>{subItem.badge}</span>
                                )}
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
          )}
          {/* Botão Mobile - Só aparece abaixo de 1024px */}
          {showMobileMenu && (
            <button 
              ref={closeButtonRef}
              className={`${styles.mobileMenuButton} ${
                isMobileMenuOpen ? styles.mobileMenuButtonActive : ''
              }`}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-haspopup="true"
            >
              {isMobileMenuOpen ? (
                <X size={windowWidth < 480 ? 20 : 22} />
              ) : (
                <MenuIcon size={windowWidth < 480 ? 20 : 22} />
              )}
            </button>
          )}
        </div>
      </header>

      {/* Overlay Mobile */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileNavBackdrop}
          onClick={closeMobileMenu}
          onKeyDown={(e) => e.key === 'Escape' && closeMobileMenu()}
          aria-hidden="true"
          role="presentation"
          tabIndex={-1}
        />
      )}

      {/* Menu Mobile */}
      {showMobileMenu && (
        <div 
          ref={mobileMenuRef}
          id="mobile-navigation"
          className={`${styles.mobileNav} ${
            isMobileMenuOpen ? styles.mobileNavActive : ''
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.mobileNavHeader}>
            <div className={styles.mobileLogo}>
              <div className={styles.mobileLogoImage}>
                <Image 
                  src="/icons/testes/HD.png"
                  alt="Hub Direitista"
                  width={36}
                  height={36}
                />
              </div>
              <div className={styles.mobileLogoText}>
                <h2 className={styles.mobileNavTitle}>Hub Direitista</h2>
                <p className={styles.mobileNavSubtitle}>Menu de Navegação</p>
              </div>
            </div>
            
            <button 
              className={styles.mobileCloseButton}
              onClick={closeMobileMenu}
              aria-label="Fechar menu"
            >
              <X size={windowWidth < 480 ? 20 : 22} />
            </button>
          </div>
          
          <div className={styles.mobileNavContent}>
            <div className={styles.mobileHomeLink}>
              <Link 
                href="/" 
                className={styles.mobileHomeLinkInner}
                onClick={closeMobileMenu}
              >
                <Home size={18} />
                <span>Página Inicial</span>
              </Link>
            </div>
            
            <ul className={styles.mobileNavList}>
              {menuItems.map((item, index) => (
                <MenuItem
                  key={`mobile-${item.href}-${index}`}
                  item={item}
                  isMobile={true}
                  onClose={closeMobileMenu}
                  expandedItems={expandedMobileItems}
                  onToggleSubmenu={toggleMobileSubmenu}
                />
              ))}
            </ul>
          </div>
          
          <div className={styles.mobileNavFooter}>
            <div className={styles.mobileFooterText}>
              © {new Date().getFullYear()} Hub Direitista
            </div>
          </div>
        </div>
      )}
    </>
  );
}