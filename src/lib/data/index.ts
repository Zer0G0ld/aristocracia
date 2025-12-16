// src/lib/data/index.ts - VERSÃO COM EXPORTAÇÃO EXPLÍCITA
// Do db.ts
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

// Do artigos.ts
export {
  getArtigos,
  getFeaturedArtigos,
  getArtigoById,
  getArtigosByCategory,
  getRelatedArtigos,
  getArtigosMetadata
} from './artigos';

// Tipos
export type { Artigo, ArtigosData, ArtigosMetadata } from '../types';
export type { 
  Member, 
  Portavoz, 
  Plataforma, 
  Link, 
  DBMetadata, 
  DBData 
} from '../types';