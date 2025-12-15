import { NextResponse } from 'next/server';
import { 
  getMembers, 
  getPortavoze, 
  getPlataformas,
  getDBData 
} from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const { category } = params;
    
    let result;
    
    switch(category.toLowerCase()) {
      case 'members':
        result = await getMembers();
        break;
      case 'portavoze':
        result = await getPortavoze();
        break;
      case 'plataformas':
        result = await getPlataformas();
        break;
      case 'all':
        const data = await getDBData();
        result = {
          members: data.members,
          portavoze: data.portavoze,
          plataformas: data.plataformas,
          categorias: data.categorias,
          metadata: data.metadata
        };
        break;
      default:
        // Filtra membros por categoria de expertise
        const members = await getMembers();
        result = members.filter(member => 
          member.expertise.some(exp => 
            exp.toLowerCase().includes(category.toLowerCase())
          )
        );
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json({ 
      error: 'Erro ao processar requisição' 
    }, { status: 500 });
  }
}