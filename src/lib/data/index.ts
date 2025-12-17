// src/lib/data/index.ts - VERSÃO MELHORADA
/**
 * 📦 Módulo de exportação centralizada de dados
 * 
 * Este módulo fornece acesso unificado aos dados do Hub Direitista.
 * Todas as importações devem ser feitas através deste arquivo.
 */

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

// Exportação de tipos - Grupo 1: Tipos principais
export type {
  // Tipos de entidades
  Member,
  Portavoz,
  Plataforma,
  Artigo,
  
  // Tipos auxiliares
  Link,
  Stats,
  
  // Tipos de metadata
  DBMetadata,
  ArtigosMetadata,
  
  // Tipos de estrutura
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
  const [featuredMembers, featuredPortavoze, featuredPlataformas, featuredArtigos] = await Promise.all([
    getFeaturedMembers(),
    getFeaturedPortavoze(),
    getPlataformas().then(plats => plats.filter(p => p.featured)),
    getFeaturedArtigos()
  ]);
  
  return {
    featuredMembers,
    featuredPortavoze,
    featuredPlataformas,
    featuredArtigos
  };
}