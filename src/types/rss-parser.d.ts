declare module 'rss-parser' {
  export interface RSSItem {
    title?: string;
    link?: string;
    pubDate?: string;
    content?: string;
    contentSnippet?: string;
    creator?: string;
    [key: string]: any;
  }

  export interface RSSFeed {
    items: RSSItem[];
    [key: string]: any;
  }

  export default class Parser {
    parseURL(url: string): Promise<RSSFeed>;
    parseString(xml: string): Promise<RSSFeed>;
  }
}
