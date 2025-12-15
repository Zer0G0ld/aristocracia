// src/lib/data/artigos.ts
import { ArtigosData } from '../types';
import artigosJson from '../../../public/data/artigos.json';

export async function getArtigosData(): Promise<ArtigosData> {
  return artigosJson as ArtigosData;
}

export async function getArtigos() {
  const data = await getArtigosData();
  return data.artigos;
}

export async function getFeaturedArtigos() {
  const data = await getArtigosData();
  return data.artigos.filter(artigo => artigo.featured);
}

export async function getArtigoById(id: number) {
  const data = await getArtigosData();
  return data.artigos.find(artigo => artigo.id === id);
}

export async function getArtigosByCategory(category: string) {
  const data = await getArtigosData();
  return data.artigos.filter(artigo => 
    artigo.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getArtigosMetadata() {
  const data = await getArtigosData();
  return data.metadata;
}