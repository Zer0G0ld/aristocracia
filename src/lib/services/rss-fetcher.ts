// src/lib/services/rss-fetcher.ts
import { Artigo } from '../types';
import Parser from 'rss-parser';

// Instalar: npm install rss-parser @types/rss-parser
interface RSSFeedItem {
  title: string;
  link: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
  creator?: string;
}

export class RSSFetcher {
  private parser: Parser;
  private memberFeeds: Map<string, string> = new Map();

  constructor() {
    this.parser = new Parser();
    this.initializeFeeds();
  }

  private initializeFeeds() {
    // Mapeia IDs de membros para URLs RSS do Substack
    // Você pode mover isso para um config depois
    this.memberFeeds.set('zer0', 'https://zer0g0ld.substack.com/feed');
    this.memberFeeds.set('staan-marsh', 'https://substack.com/@adson02/feed');
    this.memberFeeds.set('noir', 'https://substack.com/@noiret/feed');
    this.memberFeeds.set('armando-leal', 'https://substack.com/@historiacontraataca/feed');
    this.memberFeeds.set('luciano-ls', 'https://substack.com/@lucianols/feed');
    // Adicione os outros...
  }

  async fetchMemberFeed(memberId: string): Promise<RSSFeedItem[]> {
    const feedUrl = this.memberFeeds.get(memberId);
    if (!feedUrl) return [];

    try {
      const feed = await this.parser.parseURL(feedUrl);
      return feed.items.slice(0, 5) as RSSFeedItem[]; // Últimos 5 artigos
    } catch (error) {
      console.error(`Erro ao buscar feed de ${memberId}:`, error);
      return [];
    }
  }

  async fetchAllFeeds(): Promise<Artigo[]> {
    const allArticles: Artigo[] = [];
    
    for (const [memberId] of this.memberFeeds) {
      const items = await this.fetchMemberFeed(memberId);
      
      const memberArticles: Artigo[] = items.map((item, index) => ({
        id: parseInt(`${Date.now()}${index}`), // ID temporário
        title: item.title || 'Sem título',
        description: item.contentSnippet?.substring(0, 150) + '...' || 'Sem descrição',
        excerpt: item.contentSnippet?.substring(0, 100) || '',
        image: '/icons/default.jpg', // Poderia tentar extrair imagem do conteúdo
        link: item.link || '#',
        author: this.getAuthorName(memberId),
        authorLink: this.getAuthorLink(memberId),
        category: 'Destaque',
        readTime: '5 min',
        publishedDate: item.pubDate || new Date().toISOString(),
        featured: true,
        tags: ['rss', 'substack', 'destaque'],
        date: item.pubDate
      }));

      allArticles.push(...memberArticles);
    }

    // Ordenar por data (mais recente primeiro)
    return allArticles
      .sort((a, b) => new Date(b.date || b.publishedDate).getTime() - new Date(a.date || a.publishedDate).getTime())
      .slice(0, 10); // Retorna apenas os 10 mais recentes
  }

  private getAuthorName(memberId: string): string {
    const names: Record<string, string> = {
      'zer0': 'Zer0',
      'staan-marsh': 'Staan Marsh',
      'noir': 'Noir',
      'armando-leal': 'Armando Leal',
      'luciano-ls': 'Luciano LS'
    };
    return names[memberId] || memberId;
  }

  private getAuthorLink(memberId: string): string {
    const links: Record<string, string> = {
      'zer0': 'https://zer0g0ld.substack.com/',
      'staan-marsh': 'https://substack.com/@adson02',
      'noir': 'https://substack.com/@noiret',
      'armando-leal': 'https://substack.com/@historiacontraataca',
      'luciano-ls': 'https://substack.com/@lucianols'
    };
    return links[memberId] || '#';
  }
}