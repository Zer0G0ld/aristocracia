// src/lib/types/index.ts
// Tipos para db.json

import { ReactNode } from "react";

// Tipo mais flexível para links
export interface Link {
  url: string;
  type: string;  // Mudado de 'external' | 'internal' para string
  icon: string;
  label?: string;
  metrics?: string;
}

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
  stats: {
    articlesCount?: number;
    subscribers?: string;
    engagement?: string;
    videoCount?: number;
  };
  tags: string[];
  contentTypes: string[];
  links: Record<string, Link>;  // Usa o novo tipo Link
}

export interface Portavoz {
  id: string;
  name: string;
  bio: string;
  role: string;
  img: string;
  color: string;
  featured: boolean;
  verified?: boolean;
  expertise: string[];
  stats: Record<string, string | number>;
  tags: string[];
  contentTypes: string[];
  platforms?: string[];
  links: Record<string, Link>;  // Usa o mesmo tipo Link
  category?: string;
  since?: string;
  partnershipLevel?: string;
  focus?: string;
  description?: string;
  platform?: string;
}

export interface Plataforma {
  id: string;

  // Conteúdo
  title: string;
  description: string;
  image?: string;

  // Classificação
  type: string;
  category: 'social' | 'forum' | 'media' | 'academic';
  tags: string[];

  // Métricas
  members: number;
  posts?: number;

  // Status
  status: 'active' | 'growing' | 'inactive';
  featured: boolean;

  // Acesso
  access: 'public' | 'private' | 'invite';

  // Datas
  createdAt: string;
  updatedAt: string;

  // Extras
  benefits?: string[];

  // Links
  url: string;
  links: Record<string, Link>;
}

export interface DBMetadata {
  version: string;
  lastUpdated: string;
  description: string;
  totalMembers: number;
  totalArticles: number;
  maintainers: string[];
  categories: string[];
}

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

// Tipos para artigos.json
export interface Artigo {
  id: number;
  title: string;
  description: string;
  excerpt?: string; // ← Adicione esta linha
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
export interface ArtigosMetadata {
  total: number;
  featured: number;
  categories: string[];
  lastUpdated: string;
  description: string;
}

export interface ArtigosData {
  artigos: Artigo[];
  metadata: ArtigosMetadata;
}

