import { NextResponse } from 'next/server';
import { getMembers, getPortavoze, getPlataformas } from '@/lib/data';

export async function GET() {
  try {
    const [members, portavoze, plataformas] = await Promise.all([
      getMembers(),
      getPortavoze(),
      getPlataformas()
    ]);

    return NextResponse.json({
      members,
      portavoze,
      plataformas,
      metadata: {
        totalMembers: members.length,
        totalPortavoze: portavoze.length,
        totalPlataformas: plataformas.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    
    // Fallback
    const fallbackData = {
      members: [],
      portavoze: [],
      plataformas: [],
      metadata: {
        error: "Erro ao carregar dados",
        timestamp: new Date().toISOString()
      }
    };
    
    return NextResponse.json(fallbackData, { status: 500 });
  }
}