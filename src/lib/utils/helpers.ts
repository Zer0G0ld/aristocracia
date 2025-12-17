// src/lib/utils/helpers.ts
export class DataHelpers {
  // Normalizar caminhos de imagem
  static normalizeImagePath(path: string): string {
    if (!path) return '/icons/default.jpg';
    
    // Remove ./public se existir
    const cleanPath = path.replace(/^\.\/public\//, '/');
    
    // Garante que começa com /
    return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  }
  
  // Formatar data
  static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  }
  
  // Validar URL
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  
  // Gerar slug
  static generateSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
}