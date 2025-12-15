// src/components/types.ts
import { Member, Portavoz, Plataforma, Artigo } from '@/lib/types';

// Tipos para GridSection
export interface GridSectionProps {
  members?: Member[];
  portavoze?: Portavoz[];
  plataformas?: Plataforma[];
}

// Tipos para FullSection
export interface FullSectionProps {
  members?: Member[];
  portavoze?: Portavoz[];
  plataformas?: Plataforma[];
}

// Tipos para Destaque
export interface DestaqueProps {
  destaques: Artigo[];  // ← CORRIGIDO: era 'item' e deveria ser 'destaques'
}

// Tipos para MiniPersonCard (usado em GridSection)
export interface MiniPersonCardProps {
  person: Member | Portavoz | Plataforma;
}

// Tipos para FullPersonCard (usado em FullSection)
export interface FullPersonCardProps {
  item: Member | Portavoz | Plataforma;
  type: 'member' | 'portavoz' | 'plataforma';
}