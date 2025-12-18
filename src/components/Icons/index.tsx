// src/components/Icons/index.tsx
import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// Ícone de Usuários (para membros)
export const UsersIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13-7.252a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

// Ícone de Gráfico/Estatísticas (para atividade)
export const ChartIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

// Ícone de Globo (para público/acesso global)
export const GlobeIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Ícone de Cadeado (para privado)
export const LockIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// Ícone de Ticket (para acesso por convite)
export const TicketIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);

// Ícone de Calendário (para datas)
export const CalendarIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Ícone de Check Verde (para ativo)
export const CheckCircleIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Ícone de Tendência Crescente (para crescendo)
export const TrendingUpIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

// Ícone de X Vermelho (para inativo)
export const XCircleIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Ícone de Fogo (para alta atividade)
export const FireIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
  </svg>
);

// Ícone de Chat (para fórum/comunidade)
export const ChatIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

// Ícone de TV (para mídia)
export const TvIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// Ícone de Academia (para acadêmico/educação)
export const AcademicIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

// Ícone de Comunidade
export const CommunityIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

// Ícone de Link
export const LinkIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

// Ícone de Tag (para categorias/tags)
export const TagIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

// Ícone de Seta para Esquerda (para voltar)
export const ArrowLeftIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

// Ícone de Link Externo
export const ExternalLinkIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

// Ícone de Estrela (para destaque)
export const StarIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill={color} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Ícone de Pino (para plataforma)
export const PinIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Ícone de Documento (para descrição)
export const DocumentIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// Ícone de Seta para Direita
export const ArrowRightIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

// Ícone de Grupo de Usuários (para membros relacionados)
export const UsersGroupIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13-7.252a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

// Ícone de Escudo (para verificado)
export const ShieldIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

// Ícone de Aviso/Proibição (para restrito)
export const BanIcon = ({ className = '', size = 20, color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

// Export all icons
export const Icons = {
  Users: UsersIcon,
  Chart: ChartIcon,
  Globe: GlobeIcon,
  Lock: LockIcon,
  Ticket: TicketIcon,
  Calendar: CalendarIcon,
  CheckCircle: CheckCircleIcon,
  TrendingUp: TrendingUpIcon,
  XCircle: XCircleIcon,
  Fire: FireIcon,
  Chat: ChatIcon,
  Tv: TvIcon,
  Academic: AcademicIcon,
  Community: CommunityIcon,
  Link: LinkIcon,
  Tag: TagIcon,
  ArrowLeft: ArrowLeftIcon,
  ExternalLink: ExternalLinkIcon,
  Star: StarIcon,
  Pin: PinIcon,
  Document: DocumentIcon,
  ArrowRight: ArrowRightIcon,
  UsersGroup: UsersGroupIcon,
  Shield: ShieldIcon,
  Ban: BanIcon
};

// Helper function to get icon by name
export const getIconByName = (name: string, props: IconProps = {}) => {
  const iconMap: Record<string, React.ComponentType<IconProps>> = {
    'users': UsersIcon,
    'chart': ChartIcon,
    'globe': GlobeIcon,
    'lock': LockIcon,
    'ticket': TicketIcon,
    'calendar': CalendarIcon,
    'check': CheckCircleIcon,
    'trending': TrendingUpIcon,
    'x-circle': XCircleIcon,
    'fire': FireIcon,
    'chat': ChatIcon,
    'tv': TvIcon,
    'academic': AcademicIcon,
    'community': CommunityIcon,
    'link': LinkIcon,
    'tag': TagIcon,
    'arrow-left': ArrowLeftIcon,
    'external-link': ExternalLinkIcon,
    'star': StarIcon,
    'pin': PinIcon,
    'document': DocumentIcon,
    'arrow-right': ArrowRightIcon,
    'users-group': UsersGroupIcon,
    'shield': ShieldIcon,
    'ban': BanIcon
  };

  const IconComponent = iconMap[name.toLowerCase()] || LinkIcon;
  return <IconComponent {...props} />;
};

// Default export
export default Icons;