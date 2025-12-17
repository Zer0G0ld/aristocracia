// src/lib/data/db.ts - VERSÃO OTIMIZADA
/**
 * 🗃️ Módulo de acesso aos dados do db.json
 * 
 * Responsável por carregar, validar e converter os dados do arquivo db.json
 * para os tipos TypeScript definidos.
 */

import { DBData, Member, Portavoz, Plataforma, Link, Stats } from '../types';
import dbJson from '../../../public/data/db.json';

// ==================== CONSTANTES ====================
const DEFAULT_IMAGE = '/icons/default.jpg';
const DEFAULT_COLOR = '#3d3d3d';
const DEFAULT_CATEGORY = 'comunidade';

// ==================== UTILITÁRIOS ====================

/**
 * Normaliza caminhos de imagem
 * - Remove ./public/ do início se existir
 * - Garante que comece com /
 * - Fornece fallback se vazio
 */
function normalizeImagePath(path: string | undefined): string {
  if (!path || typeof path !== 'string') return DEFAULT_IMAGE;
  
  // Remove ./public/ do início
  let cleanPath = path.replace(/^\.\/public\//, '');
  
  // Garante que começa com /
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }
  
  return cleanPath;
}

/**
 * Converte stats para o tipo correto
 * Garante que valores numéricos e de string sejam tratados apropriadamente
 */
function convertStats(stats: any): Stats {
  if (!stats || typeof stats !== 'object') return {};
  
  return {
    articlesCount: typeof stats.articlesCount === 'number' ? stats.articlesCount : undefined,
    subscribers: typeof stats.subscribers === 'string' ? stats.subscribers : undefined,
    engagement: typeof stats.engagement === 'string' ? stats.engagement : undefined,
    videoCount: typeof stats.videoCount === 'number' ? stats.videoCount : undefined,
    ...stats
  };
}

/**
 * Converte links para o tipo Link validado
 * Garante type válido (external/internal) e valores padrão
 */
function convertLinks(links: any): Record<string, Link> {
  if (!links || typeof links !== 'object') return {};
  
  const result: Record<string, Link> = {};
  
  Object.entries(links).forEach(([key, value]: [string, any]) => {
    if (!value || typeof value !== 'object') return;
    
    // Determina o tipo do link com validação
    const linkType = value.type === 'internal' ? 'internal' : 'external';
    
    // Valida URL básica
    const url = typeof value.url === 'string' ? value.url : '';
    
    result[key] = {
      url,
      type: linkType,
      icon: typeof value.icon === 'string' ? value.icon : '🔗',
      label: typeof value.label === 'string' ? value.label : undefined,
      metrics: typeof value.metrics === 'string' ? value.metrics : undefined
    };
  });
  
  return result;
}

/**
 * Valida e converte dados de portavoze
 * Trata campos específicos de portavoze como stats e platforms
 */
function convertPortavozData(portavoz: any): Portavoz {
  // Converter stats para Record<string, string | number>
  const portavozStats: Record<string, string | number> = {};
  if (portavoz.stats && typeof portavoz.stats === 'object') {
    Object.entries(portavoz.stats).forEach(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number') {
        portavozStats[key] = value;
      } else if (value != null) {
        portavozStats[key] = String(value);
      }
    });
  }
  
  return {
    id: typeof portavoz.id === 'string' ? portavoz.id : `portavoz-${Date.now()}`,
    name: typeof portavoz.name === 'string' ? portavoz.name : 'Porta-voz',
    bio: typeof portavoz.bio === 'string' ? portavoz.bio : '',
    role: typeof portavoz.role === 'string' 
      ? portavoz.role 
      : typeof portavoz.title === 'string' 
        ? portavoz.title 
        : 'Porta-voz',
    img: normalizeImagePath(portavoz.img),
    color: typeof portavoz.color === 'string' ? portavoz.color : DEFAULT_COLOR,
    featured: Boolean(portavoz.featured),
    verified: Boolean(portavoz.verified),
    category: typeof portavoz.category === 'string' ? portavoz.category : undefined,
    since: typeof portavoz.since === 'string' ? portavoz.since : undefined,
    partnershipLevel: typeof portavoz.partnershipLevel === 'string' ? portavoz.partnershipLevel : undefined,
    focus: typeof portavoz.focus === 'string' 
      ? portavoz.focus 
      : portavoz.specialization?.focus,
    platform: typeof portavoz.platform === 'string'
      ? portavoz.platform
      : portavoz.platforms?.primary,
    description: typeof portavoz.description === 'string'
      ? portavoz.description
      : typeof portavoz.bio === 'string'
        ? portavoz.bio.substring(0, 200)
        : undefined,
    expertise: Array.isArray(portavoz.expertise) 
      ? portavoz.expertise.filter((e: any) => typeof e === 'string')
      : [],
    stats: portavozStats,
    tags: Array.isArray(portavoz.tags)
      ? portavoz.tags.filter((t: any) => typeof t === 'string')
      : [],
    contentTypes: Array.isArray(portavoz.contentTypes)
      ? portavoz.contentTypes.filter((ct: any) => typeof ct === 'string')
      : [],
    links: convertLinks(portavoz.links)
  };
}

// ==================== FUNÇÕES PRINCIPAIS ====================

/**
 * Carrega e processa todos os dados do db.json
 * Inclui validação e conversão de tipos
 */
export async function getDBData(): Promise<DBData> {
  try {
    if (!dbJson) {
      throw new Error('db.json não encontrado ou vazio');
    }
    
    console.log('📦 Carregando dados do db.json...');
    
    // Processamento em paralelo para performance
    const [members, portavoze, plataformas] = await Promise.all([
      // Processar membros
      (async () => {
        const rawMembers = dbJson.members || [];
        return rawMembers.map((member: any): Member => ({
          id: typeof member.id === 'string' ? member.id : `member-${Date.now()}`,
          name: typeof member.name === 'string' ? member.name : 'Membro',
          bio: typeof member.bio === 'string' ? member.bio : '',
          role: typeof member.role === 'string' ? member.role : 'Membro',
          img: normalizeImagePath(member.img),
          color: typeof member.color === 'string' ? member.color : DEFAULT_COLOR,
          featured: Boolean(member.featured),
          verified: Boolean(member.verified),
          joinDate: typeof member.joinDate === 'string' ? member.joinDate : new Date().toISOString().split('T')[0],
          expertise: Array.isArray(member.expertise) 
            ? member.expertise.filter((e: any) => typeof e === 'string')
            : [],
          stats: convertStats(member.stats),
          tags: Array.isArray(member.tags)
            ? member.tags.filter((t: any) => typeof t === 'string')
            : [],
          contentTypes: Array.isArray(member.contentTypes)
            ? member.contentTypes.filter((ct: any) => typeof ct === 'string')
            : [],
          links: convertLinks(member.links)
        }));
      })(),
      
      // Processar portavoze
      (async () => {
        const rawPortavoze = dbJson.portavoze || [];
        return rawPortavoze.map(convertPortavozData);
      })(),
      
      // Processar plataformas
      (async () => {
        const rawPlataformas = dbJson.plataformas || [];
        return rawPlataformas.map((plataforma: any): Plataforma => ({
          id: typeof plataforma.id === 'string' ? plataforma.id : `plataforma-${Date.now()}`,
          name: typeof plataforma.name === 'string' 
            ? plataforma.name 
            : typeof plataforma.title === 'string'
              ? plataforma.title
              : 'Plataforma',
          type: typeof plataforma.type === 'string' ? plataforma.type : 'comunidade',
          img: normalizeImagePath(plataforma.img),
          color: typeof plataforma.color === 'string' ? plataforma.color : DEFAULT_COLOR,
          featured: Boolean(plataforma.featured),
          members: typeof plataforma.members === 'number' ? plataforma.members : 0,
          category: typeof plataforma.category === 'string' ? plataforma.category : DEFAULT_CATEGORY,
          tags: Array.isArray(plataforma.tags)
            ? plataforma.tags.filter((t: any) => typeof t === 'string')
            : [],
          access: typeof plataforma.access === 'string' ? plataforma.access : 'public',
          activity: typeof plataforma.activity === 'string' ? plataforma.activity : 'média',
          links: convertLinks(plataforma.links),
          description: typeof plataforma.description === 'string' ? plataforma.description : undefined,
          title: typeof plataforma.name === 'string' ? plataforma.name : undefined
        }));
      })()
    ]);
    
    const totalMembers = members.length;
    
    console.log(`✅ Dados carregados: 
      • ${totalMembers} membros
      • ${portavoze.length} porta-vozes  
      • ${plataformas.length} plataformas`);
    
    return {
      metadata: dbJson.metadata && typeof dbJson.metadata === 'object'
        ? {
            version: typeof dbJson.metadata.version === 'string' ? dbJson.metadata.version : '1.0',
            lastUpdated: typeof dbJson.metadata.lastUpdated === 'string' 
              ? dbJson.metadata.lastUpdated 
              : new Date().toISOString().split('T')[0],
            description: typeof dbJson.metadata.description === 'string'
              ? dbJson.metadata.description
              : 'Hub Direitista - Base de Dados',
            totalMembers: typeof dbJson.metadata.totalMembers === 'number'
              ? dbJson.metadata.totalMembers
              : totalMembers,
            totalArticles: typeof dbJson.metadata.totalArticles === 'number'
              ? dbJson.metadata.totalArticles
              : 0,
            maintainers: Array.isArray(dbJson.metadata.maintainers)
              ? dbJson.metadata.maintainers.filter((m: any) => typeof m === 'string')
              : [],
            categories: Array.isArray(dbJson.metadata.categories)
              ? dbJson.metadata.categories.filter((c: any) => typeof c === 'string')
              : []
          }
        : {
            version: '1.0',
            lastUpdated: new Date().toISOString().split('T')[0],
            description: 'Hub Direitista - Base de Dados',
            totalMembers,
            totalArticles: 0,
            maintainers: [],
            categories: []
          },
      members,
      portavoze,
      plataformas,
      categorias: dbJson.categorias && typeof dbJson.categorias === 'object'
        ? {
            temas: Array.isArray(dbJson.categorias.temas)
              ? dbJson.categorias.temas.filter((t: any) => 
                  t && typeof t === 'object' && 
                  typeof t.id === 'string' &&
                  typeof t.nome === 'string'
                )
              : [],
            tiposConteudo: Array.isArray(dbJson.categorias.tiposConteudo)
              ? dbJson.categorias.tiposConteudo.filter((t: any) =>
                  t && typeof t === 'object' &&
                  typeof t.id === 'string' &&
                  typeof t.nome === 'string'
                )
              : []
          }
        : { temas: [], tiposConteudo: [] }
    };
    
  } catch (error) {
    console.error('❌ ERRO CRÍTICO ao carregar db.json:', error);
    
    // Fallback seguro com logging
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  Usando dados de fallback devido a erro de carregamento');
    }
    
    return {
      metadata: {
        version: 'error',
        lastUpdated: new Date().toISOString(),
        description: 'Erro na carga dos dados',
        totalMembers: 0,
        totalArticles: 0,
        maintainers: ['sistema'],
        categories: []
      },
      members: [],
      portavoze: [],
      plataformas: [],
      categorias: { temas: [], tiposConteudo: [] }
    };
  }
}

// ==================== FUNÇÕES DE ACESSO ====================

/**
 * Retorna todos os membros
 */
export async function getMembers(): Promise<Member[]> {
  const data = await getDBData();
  return data.members;
}

/**
 * Retorna membros em destaque (featured)
 */
export async function getFeaturedMembers(): Promise<Member[]> {
  const data = await getDBData();
  return data.members.filter(member => member.featured);
}

/**
 * Busca um membro pelo ID
 * @param id - ID do membro
 * @returns O membro ou undefined se não encontrado
 */
export async function getMemberById(id: string): Promise<Member | undefined> {
  if (!id || typeof id !== 'string') return undefined;
  
  const data = await getDBData();
  return data.members.find(member => member.id === id);
}

/**
 * Retorna todos os porta-vozes
 */
export async function getPortavoze(): Promise<Portavoz[]> {
  const data = await getDBData();
  return data.portavoze;
}

/**
 * Retorna porta-vozes em destaque
 */
export async function getFeaturedPortavoze(): Promise<Portavoz[]> {
  const data = await getDBData();
  return data.portavoze.filter(portavoz => portavoz.featured);
}

/**
 * Busca um porta-voz pelo ID
 */
export async function getPortavozById(id: string): Promise<Portavoz | undefined> {
  if (!id || typeof id !== 'string') return undefined;
  
  const data = await getDBData();
  return data.portavoze.find(portavoz => portavoz.id === id);
}

/**
 * Retorna todas as plataformas
 */
export async function getPlataformas(): Promise<Plataforma[]> {
  const data = await getDBData();
  return data.plataformas;
}

/**
 * Busca uma plataforma pelo ID
 * @returns A plataforma ou null se não encontrada
 */
export async function getPlataformaById(id: string): Promise<Plataforma | null> {
  if (!id || typeof id !== 'string') return null;
  
  const data = await getDBData();
  const plataforma = data.plataformas.find(p => p.id === id);
  return plataforma || null;
}

/**
 * Retorna as categorias organizadas por temas e tipos de conteúdo
 */
export async function getCategorias() {
  const data = await getDBData();
  return data.categorias;
}

/**
 * Retorna os metadados do banco de dados
 */
export async function getMetadata() {
  const data = await getDBData();
  return data.metadata;
}

// ==================== FUNÇÕES UTILITÁRIAS ADICIONAIS ====================

/**
 * Busca por termo em membros, porta-vozes e plataformas
 */
export async function searchByTerm(term: string): Promise<{
  members: Member[];
  portavoze: Portavoz[];
  plataformas: Plataforma[];
}> {
  if (!term || typeof term !== 'string') {
    return { members: [], portavoze: [], plataformas: [] };
  }
  
  const searchTerm = term.toLowerCase();
  const data = await getDBData();
  
  const filterByTerm = <T extends { name: string; tags?: string[]; expertise?: string[] }>(
    items: T[]
  ): T[] => {
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      (Array.isArray(item.tags) && item.tags.some(tag => 
        tag.toLowerCase().includes(searchTerm)
      )) ||
      (Array.isArray(item.expertise) && item.expertise.some(exp => 
        exp.toLowerCase().includes(searchTerm)
      ))
    );
  };
  
  return {
    members: filterByTerm(data.members),
    portavoze: filterByTerm(data.portavoze),
    plataformas: filterByTerm(data.plataformas)
  };
}

/**
 * Retorna estatísticas gerais do hub
 */
export async function getHubStats() {
  const data = await getDBData();
  const totalFeatured = 
    data.members.filter(m => m.featured).length +
    data.portavoze.filter(p => p.featured).length +
    data.plataformas.filter(p => p.featured).length;
  
  const totalMembers = 
    data.members.length + 
    data.portavoze.length + 
    data.plataformas.reduce((sum, p) => sum + p.members, 0);
  
  return {
    totalMembers: data.members.length,
    totalPortavoze: data.portavoze.length,
    totalPlataformas: data.plataformas.length,
    totalFeatured,
    totalHubMembers: totalMembers,
    lastUpdated: data.metadata.lastUpdated
  };
}