// src/app/plataformas/[id]/page.tsx - VERSÃO COM ÍCONES SVG
import { notFound } from 'next/navigation';
import { getPlataformaById, getPlataformas, getMembers } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { Plataforma, Member } from '@/lib/types';
import { Icons } from '@/components/Icons';

interface PlataformaPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const plataformas = await getPlataformas();
  return plataformas.map((plataforma) => ({
    id: plataforma.id.toString(),
  }));
}

export default async function PlataformaPage({ params }: PlataformaPageProps) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }
  
  const [plataforma, allMembers] = await Promise.all([
    getPlataformaById(id),
    getMembers()
  ]);
  
  if (!plataforma) {
    notFound();
  }

  // Encontrar membros que usam esta plataforma
  const plataformaUsers = allMembers.filter(member => 
    member.links && Object.values(member.links).some(link => 
      link.url.includes(plataforma.name.toLowerCase()) || 
      link.label?.toLowerCase().includes(plataforma.name.toLowerCase())
    )
  );

  // Funções auxiliares com ícones SVG
  const getCategoryIcon = (category: string): React.ReactNode => {
    const icons: Record<string, React.ReactNode> = {
      'social': <Icons.Globe className={styles.categoryIcon} size={18} />,
      'forum': <Icons.Chat className={styles.categoryIcon} size={18} />,
      'media': <Icons.Tv className={styles.categoryIcon} size={18} />,
      'academic': <Icons.Academic className={styles.categoryIcon} size={18} />,
      'comunidade': <Icons.Community className={styles.categoryIcon} size={18} />,
      'rede social': <Icons.Globe className={styles.categoryIcon} size={18} />,
      'mídia': <Icons.Tv className={styles.categoryIcon} size={18} />,
      'educação': <Icons.Academic className={styles.categoryIcon} size={18} />,
      'tecnologia': <Icons.Chart className={styles.categoryIcon} size={18} />,
      'debate': <Icons.Chat className={styles.categoryIcon} size={18} />
    };
    return icons[category.toLowerCase()] || <Icons.Link className={styles.categoryIcon} size={18} />;
  };

  const getCategoryName = (category: string): string => {
    const names: Record<string, string> = {
      'social': 'Rede Social',
      'forum': 'Fórum de Debates',
      'media': 'Mídia Digital',
      'academic': 'Plataforma Acadêmica',
      'comunidade': 'Comunidade',
      'rede social': 'Rede Social',
      'mídia': 'Mídia Digital',
      'educação': 'Educação',
      'tecnologia': 'Tecnologia',
      'debate': 'Plataforma de Debate'
    };
    return names[category.toLowerCase()] || category;
  };

  const getStatusInfo = (status?: string) => {
    const statuses: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
      'active': { 
        label: 'Ativa', 
        color: '#10b981', 
        icon: <Icons.CheckCircle className={styles.statusIcon} size={14} /> 
      },
      'growing': { 
        label: 'Crescendo', 
        color: '#f59e0b', 
        icon: <Icons.TrendingUp className={styles.statusIcon} size={14} /> 
      },
      'inactive': { 
        label: 'Inativa', 
        color: '#6b7280', 
        icon: <Icons.XCircle className={styles.statusIcon} size={14} /> 
      },
      'alta': { 
        label: 'Alta Atividade', 
        color: '#10b981', 
        icon: <Icons.Fire className={styles.statusIcon} size={14} /> 
      },
      'média': { 
        label: 'Atividade Média', 
        color: '#f59e0b', 
        icon: <Icons.Chart className={styles.statusIcon} size={14} /> 
      },
      'baixa': { 
        label: 'Baixa Atividade', 
        color: '#ef4444', 
        icon: <Icons.Chart className={styles.statusIcon} size={14} /> 
      }
    };
    return statuses[status?.toLowerCase() || 'inactive'] || statuses['inactive'];
  };

  const getAccessLevel = (access?: string) => {
    const levels: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
      'public': { 
        label: 'Público', 
        color: '#10b981', 
        icon: <Icons.Globe className={styles.accessIcon} size={16} /> 
      },
      'private': { 
        label: 'Privado', 
        color: '#8b5cf6', 
        icon: <Icons.Lock className={styles.accessIcon} size={16} /> 
      },
      'por convite': { 
        label: 'Por Convite', 
        color: '#f59e0b', 
        icon: <Icons.Ticket className={styles.accessIcon} size={16} /> 
      },
      'aberto': { 
        label: 'Aberto', 
        color: '#10b981', 
        icon: <Icons.Globe className={styles.accessIcon} size={16} /> 
      },
      'restrito': { 
        label: 'Restrito', 
        color: '#ef4444', 
        icon: <Icons.Lock className={styles.accessIcon} size={16} /> 
      }
    };
    return levels[access?.toLowerCase() || 'public'] || levels['public'];
  };

  const getPlatformType = (type?: string) => {
    const types: Record<string, { label: string; icon: React.ReactNode }> = {
      'comunidade': { 
        label: 'Comunidade', 
        icon: <Icons.Community className={styles.typeIcon} size={18} /> 
      },
      'fórum': { 
        label: 'Fórum', 
        icon: <Icons.Chat className={styles.typeIcon} size={18} /> 
      },
      'social': { 
        label: 'Rede Social', 
        icon: <Icons.Globe className={styles.typeIcon} size={18} /> 
      },
      'media': { 
        label: 'Mídia', 
        icon: <Icons.Tv className={styles.typeIcon} size={18} /> 
      },
      'academic': { 
        label: 'Acadêmica', 
        icon: <Icons.Academic className={styles.typeIcon} size={18} /> 
      },
      'debate': { 
        label: 'Debate', 
        icon: <Icons.Chat className={styles.typeIcon} size={18} /> 
      },
      'educação': { 
        label: 'Educação', 
        icon: <Icons.Academic className={styles.typeIcon} size={18} /> 
      }
    };
    return types[type?.toLowerCase() || 'comunidade'] || { 
      label: type || 'Plataforma', 
      icon: <Icons.Link className={styles.typeIcon} size={18} /> 
    };
  };

  // Calcular métricas
  const platformActivity = plataforma.activity || 'média';
  const statusInfo = getStatusInfo(plataforma.status);
  const accessInfo = getAccessLevel(plataforma.access);
  const platformType = getPlatformType(plataforma.type);

  return (
    <div className={styles.container}>
      {/* Header com navegação */}
      <nav className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/plataformas">Plataformas</Link>
        <span>/</span>
        <span className={styles.currentPage}>{plataforma.name}</span>
      </nav>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.headerInfo}>
            <div className={styles.categoryWrapper}>
              <div className={styles.categoryBadge}>
                {getCategoryIcon(plataforma.category)}
                <span>{getCategoryName(plataforma.category)}</span>
              </div>
              <div className={styles.statusIndicator} style={{ backgroundColor: statusInfo.color }}>
                {statusInfo.icon}
                <span>{statusInfo.label}</span>
              </div>
            </div>
            
            <h1 className={styles.title}>{plataforma.title || plataforma.name}</h1>
            
            <div className={styles.metaInfo}>
              <span className={styles.metaItem}>
                {platformType.icon}
                <span>{platformType.label}</span>
              </span>
              <span className={styles.metaItem}>
                <Icons.Users className={styles.metaIcon} size={16} />
                <span>{plataforma.members?.toLocaleString() || '0'} membros</span>
              </span>
              {plataforma.createdAt && (
                <span className={styles.metaItem}>
                  <Icons.Calendar className={styles.metaIcon} size={16} />
                  <span>Desde {new Date(plataforma.createdAt).getFullYear()}</span>
                </span>
              )}
            </div>
          </div>
          
          <div className={styles.descriptionCard}>
            <h3>
              <Icons.Document className={styles.sectionIcon} size={18} />
              Descrição
            </h3>
            <p>{plataforma.description || 'Esta plataforma não possui descrição detalhada.'}</p>
          </div>
          
          <div className={styles.quickStats}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Icons.Users className={styles.statSvgIcon} size={24} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>{plataforma.members?.toLocaleString() || '0'}</div>
                <div className={styles.statLabel}>Membros</div>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Icons.Chart className={styles.statSvgIcon} size={24} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>{platformActivity}</div>
                <div className={styles.statLabel}>Atividade</div>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                {accessInfo.icon}
              </div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>{accessInfo.label}</div>
                <div className={styles.statLabel}>Acesso</div>
              </div>
            </div>
          </div>
          
          {(plataforma.url || plataforma.links) && (
            <div className={styles.actionButtons}>
              {plataforma.url && (
                <a 
                  href={plataforma.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.primaryButton}
                >
                  <Icons.ExternalLink className={styles.buttonIcon} size={18} />
                  Visitar Plataforma
                </a>
              )}
              
              {plataforma.links && Object.keys(plataforma.links).length > 0 && (
                <div className={styles.linkButtons}>
                  {Object.entries(plataforma.links).map(([key, link]: [string, any]) => (
                    <a
                      key={key}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.secondaryButton}
                      title={link.label || key}
                    >
                      <span className={styles.linkIconWrapper}>
                        {link.icon || '🔗'}
                      </span>
                      {key}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        {(plataforma.image || plataforma.img) && (
          <div className={styles.heroImage}>
            <Image
              src={plataforma.image || plataforma.img}
              alt={`Imagem da plataforma ${plataforma.name}`}
              width={600}
              height={400}
              className={styles.platformImage}
              priority
            />
            <div className={styles.imageOverlay}>
              <span className={styles.featuredBadge}>
                {plataforma.featured ? (
                  <>
                    <Icons.Star className={styles.badgeIcon} size={14} />
                    Destaque
                  </>
                ) : (
                  <>
                    <Icons.Pin className={styles.badgeIcon} size={14} />
                    Plataforma
                  </>
                )}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Detalhes da Plataforma */}
      <div className={styles.detailsSection}>
        <h2 className={styles.sectionTitle}>
          <Icons.Document className={styles.sectionTitleIcon} size={24} />
          Detalhes da Plataforma
        </h2>
        
        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              {platformType.icon}
              <h3>Tipo</h3>
            </div>
            <p className={styles.detailValue}>{platformType.label}</p>
          </div>
          
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              {accessInfo.icon}
              <h3>Acesso</h3>
            </div>
            <p className={styles.detailValue} style={{ color: accessInfo.color }}>
              {accessInfo.label}
            </p>
          </div>
          
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <Icons.Chart className={styles.detailIcon} size={18} />
              <h3>Atividade</h3>
            </div>
            <p className={styles.detailValue}>
              <span className={styles.activityLevel} data-level={platformActivity}>
                {platformActivity}
              </span>
            </p>
          </div>
          
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <Icons.Tag className={styles.detailIcon} size={18} />
              <h3>Categoria</h3>
            </div>
            <p className={styles.detailValue}>{getCategoryName(plataforma.category)}</p>
          </div>
        </div>
        
        {/* Tags */}
        {plataforma.tags && plataforma.tags.length > 0 && (
          <div className={styles.tagsSection}>
            <h3 className={styles.subsectionTitle}>
              <Icons.Tag className={styles.subsectionIcon} size={18} />
              Tags Relacionadas
            </h3>
            <div className={styles.tagsContainer}>
              {plataforma.tags.map((tag: string, index: number) => (
                <span key={index} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Membros que usam esta plataforma */}
        {plataformaUsers.length > 0 && (
          <div className={styles.usersSection}>
            <h3 className={styles.subsectionTitle}>
              <Icons.UsersGroup className={styles.subsectionIcon} size={18} />
              Membros Relacionados
            </h3>
            <p className={styles.sectionDescription}>
              {plataformaUsers.length} membro(s) do Hub Direitista utilizam esta plataforma
            </p>
            <div className={styles.usersGrid}>
              {plataformaUsers.slice(0, 6).map((member: Member) => (
                <Link 
                  key={member.id} 
                  href={`/producao-intelectual/${member.id}`}
                  className={styles.userCard}
                >
                  <div className={styles.userAvatar}>
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={48}
                      height={48}
                      className={styles.avatarImage}
                    />
                  </div>
                  <div className={styles.userInfo}>
                    <h4>{member.name}</h4>
                    <p className={styles.userRole}>{member.role}</p>
                  </div>
                </Link>
              ))}
            </div>
            {plataformaUsers.length > 6 && (
              <div className={styles.moreUsers}>
                <span>+{plataformaUsers.length - 6} outros membros</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Seção de Links Úteis */}
      {plataforma.links && Object.keys(plataforma.links).length > 0 && (
        <div className={styles.linksSection}>
          <h2 className={styles.sectionTitle}>
            <Icons.Link className={styles.sectionTitleIcon} size={24} />
            Links e Recursos
          </h2>
          <div className={styles.linksGrid}>
            {Object.entries(plataforma.links).map(([key, link]: [string, any]) => (
              <a
                key={key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkCard}
              >
                <div className={styles.linkIcon}>
                  <span className={styles.linkIconWrapper}>
                    {link.icon || '🔗'}
                  </span>
                </div>
                <div className={styles.linkContent}>
                  <h3>{key}</h3>
                  <p className={styles.linkUrl}>{new URL(link.url).hostname}</p>
                  {link.label && <p className={styles.linkDescription}>{link.label}</p>}
                </div>
                <div className={styles.linkArrow}>
                  <Icons.ArrowRight className={styles.arrowIcon} size={20} />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Navegação */}
      <div className={styles.navigationSection}>
        <Link href="/plataformas" className={styles.backButton}>
          <Icons.ArrowLeft className={styles.buttonIcon} size={18} />
          Voltar para Todas as Plataformas
        </Link>
        
        {plataforma.featured && (
          <Link href="/plataformas?featured=true" className={styles.featuredLink}>
            <Icons.Star className={styles.featuredIcon} size={16} />
            Ver Todas em Destaque
          </Link>
        )}
      </div>

      {/* Metadata footer */}
      <footer className={styles.metadataFooter}>
        <p className={styles.metadataText}>
          Plataforma indexada no Hub Direitista • 
          Última atualização: {new Date().toLocaleDateString('pt-BR')} • 
          ID: {plataforma.id}
        </p>
      </footer>
    </div>
  );
}