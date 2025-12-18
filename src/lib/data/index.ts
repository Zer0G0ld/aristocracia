// src/lib/data/index.ts
/**
 * 📦 Módulo de exportação centralizada de dados
 * 
 * Este módulo fornece acesso unificado aos dados do Hub Direitista.
 * Todas as importações devem ser feitas através deste arquivo.
 */

import { getArtigos, getFeaturedArtigos } from './artigos';
import { getMembers, getPortavoze, getPlataformas, getFeaturedMembers, getFeaturedPortavoze } from './db';

// Re-exportações do db.ts
export {
  getDBData,
  getMembers,
  getFeaturedMembers,
  getMemberById,
  getPortavoze,
  getFeaturedPortavoze,
  getPortavozById,
  getPlataformas,
  getPlataformaById,
  getCategorias,
  getMetadata
} from './db';

// Re-exportações do artigos.ts
export {
  getArtigos,
  getFeaturedArtigos,
  getArtigoById,
  getArtigosByCategory,
  getRelatedArtigos,
  getArtigosMetadata
} from './artigos';

// Exportação de tipos
export type {
  Member,
  Portavoz,
  Plataforma,
  Artigo,
  Link,
  Stats,
  DBMetadata,
  ArtigosMetadata,
  DBData,
  ArtigosData
} from '../types';

// Funções utilitárias de acesso rápido
export async function getTotalCounts() {
  const [members, portavoze, plataformas, artigos] = await Promise.all([
    getMembers(),
    getPortavoze(),
    getPlataformas(),
    getArtigos()
  ]);
  
  return {
    members: members.length,
    portavoze: portavoze.length,
    plataformas: plataformas.length,
    artigos: artigos.length
  };
}

export async function getHomepageData() {
  const [featuredMembers, featuredPortavoze, featuredArtigos] = await Promise.all([
    getFeaturedMembers(),
    getFeaturedPortavoze(),
    getFeaturedArtigos()
  ]);
  
  // Filtra plataformas featured
  const plataformas = await getPlataformas();
  const featuredPlataformas = plataformas.filter(p => p.featured);
  
  return {
    featuredMembers,
    featuredPortavoze,
    featuredPlataformas,
    featuredArtigos
  };
}