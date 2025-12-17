// src/lib/types/index.ts

// Tipos Base
export interface Link {
  url: string;
  type: 'external' | 'internal';
  icon: string;
  label?: string;
  metrics?: string;
}

export interface Stats {
  articlesCount?: number;
  subscribers?: string;
  engagement?: string;
  videoCount?: number;
  [key: string]: string | number | undefined;
}

// Member
export interface Member {
  id: string;
  name: string;
  bio: string;
  role: string;
  img: string;
  color: string;
  featured: boolean;
  verified?: boolean;
  joinDate: string;
  expertise: string[];
  stats: Stats;
  tags: string[];
  contentTypes: string[];
  links: Record<string, Link>;
}

// Portavoz
export interface Portavoz {
  id: string;
  name: string;
  bio: string;
  role: string;
  img: string;
  color: string;
  featured: boolean;
  verified?: boolean;
  category?: string;
  since?: string;
  partnershipLevel?: string;
  focus?: string;
  platform?: string;
  description?: string;
  expertise: string[];
  stats: Record<string, string | number>;
  tags: string[];
  contentTypes: string[];
  links: Record<string, Link>;
}

// Plataforma - VERSÃO COMPLETA COM TODOS OS CAMPOS
export interface Plataforma {
  id: string;
  name: string;
  type: string;
  img: string;
  color: string;
  featured: boolean;
  members: number;
  category: string;
  tags: string[];
  access: string;
  activity: string;
  links: Record<string, Link>;
  description?: string;
  title?: string;
  
  // Campos adicionais usados pelas páginas
  posts?: number;
  status?: string;
  url?: string;
  image?: string; // Alias para img para compatibilidade
  createdAt?: string;
  updatedAt?: string;
  benefits?: string[];
}

// Artigo
export interface Artigo {
  id: number;
  title: string;
  description: string;
  excerpt?: string;
  image: string;
  link: string;
  author: string;
  authorLink?: string;
  category: string;
  readTime: string;
  publishedDate: string;
  featured: boolean;
  tags: string[];
  date?: string;
}

// Metadata
export interface DBMetadata {
  version: string;
  lastUpdated: string;
  description: string;
  totalMembers: number;
  totalArticles: number;
  maintainers: string[];
  categories: string[];
}

export interface ArtigosMetadata {
  total: number;
  featured: number;
  categories: string[];
  lastUpdated: string;
  description: string;
}

// Data Structures
export interface DBData {
  metadata: DBMetadata;
  members: Member[];
  portavoze: Portavoz[];
  plataformas: Plataforma[];
  categorias: {
    temas: Array<{id: string; nome: string; cor: string; descricao: string}>;
    tiposConteudo: Array<{id: string; nome: string; icon: string}>;
  };
}

export interface ArtigosData {
  artigos: Artigo[];
  metadata: ArtigosMetadata;
}