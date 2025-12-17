// src/lib/validators/members.ts
import { Member } from '../types';

export class MemberValidator {
  static isValid(data: any): data is Member {
    // Validação rigorosa
    const isValid = (
      typeof data?.id === 'string' && data.id.length > 0 &&
      typeof data?.name === 'string' && data.name.length > 0 &&
      typeof data?.bio === 'string' && data.bio.length > 0 &&
      typeof data?.role === 'string' &&
      typeof data?.img === 'string' &&
      data.img.startsWith('/') &&
      Array.isArray(data?.expertise) &&
      data.expertise.every((e: any) => typeof e === 'string') &&
      Array.isArray(data?.tags) &&
      data.tags.every((t: any) => typeof t === 'string') &&
      typeof data?.stats === 'object' &&
      typeof data?.featured === 'boolean'
    );

    if (!isValid) {
      console.warn('Membro inválido detectado:', data?.id || 'unknown');
    }

    return isValid;
  }

  static validateAll(members: any[]): Member[] {
    if (!Array.isArray(members)) {
      throw new Error('❌ DB Error: members deve ser um array');
    }

    const validMembers: Member[] = [];
    const invalidMembers: any[] = [];

    members.forEach(member => {
      if (this.isValid(member)) {
        validMembers.push(member);
      } else {
        invalidMembers.push(member);
      }
    });

    if (invalidMembers.length > 0) {
      console.error(`⚠️  ${invalidMembers.length} membros inválidos:`, 
        invalidMembers.map(m => m?.id || 'sem-id'));
      
      // Em produção, podemos escolher lançar erro ou apenas logar
      if (process.env.NODE_ENV === 'production') {
        throw new Error(`Validação falhou: ${invalidMembers.length} membros inválidos`);
      }
    }

    return validMembers;
  }
}