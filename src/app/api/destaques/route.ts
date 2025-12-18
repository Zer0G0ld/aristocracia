// src/app/api/destaques/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CacheManager } from '@/lib/services/cache';
import { getFeaturedArtigos } from '@/lib/data';

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const forceRefresh = searchParams.get('refresh') === 'true';
    const limit = parseInt(searchParams.get('limit') || '5');
    
    // Verificar cache
    if (!forceRefresh) {
      const cached = CacheManager.get<any[]>('destaques');
      if (cached) {
        return NextResponse.json(cached.slice(0, limit), {
          headers: {
            'x-cache': 'HIT',
            'x-cached-at': new Date().toISOString()
          }
        });
      }
    }
    
    console.log('🔄 Buscando destaques...');
    
    // Por enquanto usa dados estáticos (depois integra RSS)
    const destaques = await getFeaturedArtigos();
    
    // Salvar no cache
    CacheManager.set('destaques', destaques);
    
    return NextResponse.json(destaques.slice(0, limit), {
      headers: {
        'x-cache': 'MISS',
        'x-fetched-at': new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ Erro na API de destaques:', error);
    
    return NextResponse.json(
      { 
        error: 'Serviço temporariamente indisponível',
        message: 'Tente novamente em alguns minutos',
        items: []
      },
      { status: 503 }
    );
  }
}

export async function HEAD() {
  const hasCache = CacheManager.get('destaques') !== null;
  
  return new NextResponse(null, {
    headers: {
      'x-cache-status': hasCache ? 'HIT' : 'MISS',
      'x-api-version': '1.0'
    }
  });
}