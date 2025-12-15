// src/lib/data/db.ts
import { DBData, Member, Portavoz, Plataforma, Link } from '../types';
import dbJson from '../../../public/data/db.json';

// Função para converter os dados para o tipo correto
function convertToDBData(data: any): DBData {
  const convertLinks = (links: any): Record<string, Link> => {
    if (!links) return {};
    
    return Object.fromEntries(
      Object.entries(links).map(([key, value]: [string, any]): [string, Link] => [
        key,
        {
          url: value.url || '',
          type: value.type || 'external',
          icon: value.icon || '🔗',
          label: value.label,
          metrics: value.metrics
        }
      ])
    );
  };

  return {
    metadata: data.metadata,
    members: (data.members || []).map((member: any): Member => ({
      ...member,
      img: member.img?.replace('./public/', '/') || '/icons/default.jpg',
      links: convertLinks(member.links)
    })),
    portavoze: (data.portavoze || []).map((portavoz: any): Portavoz => ({
      ...portavoz,
      img: portavoz.img?.replace('./public/', '/') || '/icons/default.jpg',
      links: convertLinks(portavoz.links)
    })),
    plataformas: (data.plataformas || []).map((plataforma: any): Plataforma => ({
      ...plataforma,
      img: plataforma.img?.replace('./public/', '/') || '/icons/default.jpg',
      links: convertLinks(plataforma.links)
    })),
    categorias: data.categorias || { temas: [], tiposConteudo: [] }
  };
}

export async function getDBData(): Promise<DBData> {
  return convertToDBData(dbJson);
}

export async function getMembers() {
  const data = await getDBData();
  return data.members;
}

export async function getFeaturedMembers() {
  const data = await getDBData();
  return data.members.filter(member => member.featured);
}

export async function getMemberById(id: string) {
  const data = await getDBData();
  return data.members.find(member => member.id === id);
}

export async function getPortavoze() {
  const data = await getDBData();
  return data.portavoze;
}

export async function getPlataformas() {
  const data = await getDBData();
  return data.plataformas;
}

export async function getCategorias() {
  const data = await getDBData();
  return data.categorias;
}

export async function getMetadata() {
  const data = await getDBData();
  return data.metadata;
}