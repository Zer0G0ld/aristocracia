// src/lib/data/index.ts
// Re-exporta tudo dos módulos
export * from './db';
export * from './artigos';

// Re-exporta os tipos necessários
export type { Artigo, ArtigosData, ArtigosMetadata } from '../types';
export type { 
  Member, 
  Portavoz, 
  Plataforma, 
  Link, 
  DBMetadata, 
  DBData 
} from '../types';