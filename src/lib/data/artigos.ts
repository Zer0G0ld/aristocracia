// src/lib/data/artigos.ts
import { ArtigosData, Artigo } from '../types';
import artigosJson from '../../../public/data/artigos.json';

export async function getArtigosData(): Promise<ArtigosData> {
  return artigosJson as ArtigosData;
}

export async function getArtigos(): Promise<Artigo[]> {
  const data = await getArtigosData();
  return data.artigos;
}

export async function getFeaturedArtigos(): Promise<Artigo[]> {
  const data = await getArtigosData();
  return data.artigos.filter(artigo => artigo.featured);
}

export async function getArtigoById(id: number): Promise<Artigo | null> {
  try {
    const data = await getArtigosData();
    return data.artigos.find(artigo => artigo.id === id) || null;
  } catch (error) {
    console.error('Error fetching artigo by id:', error);
    return null;
  }
}

export async function getArtigosByCategory(category: string): Promise<Artigo[]> {
  const data = await getArtigosData();
  return data.artigos.filter(artigo => 
    artigo.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getRelatedArtigos(category: string, excludeId: number): Promise<Artigo[]> {
  try {
    const data = await getArtigosData();
    return data.artigos
      .filter(artigo => 
        artigo.id !== excludeId && 
        artigo.category === category
      )
      .slice(0, 3);
  } catch (error) {
    console.error('Error fetching related artigos:', error);
    return [];
  }
}

export async function getArtigosMetadata() {
  const data = await getArtigosData();
  return data.metadata;
}