  // src/components/FullSection/FullSection.tsx
  'use client';

  import { useState, useEffect } from 'react';
  import Image from 'next/image';
  import { Member, Portavoz, Plataforma } from '@/lib/types';
  import { FullSectionProps, FullPersonCardProps } from '../types';

  function FullPersonCard({ item, type }: FullPersonCardProps) {
    // NÃO precisa mais remover "./public" - já foi feito no db.ts
    const imagePath = item.img || '/icons/default.jpg';
    const links = item.links || {};
    
    // Trata os diferentes tipos de itens
    const getDescription = (): string => {
      if (type === 'member' || type === 'portavoz') {
        const memberItem = item as Member | Portavoz;
        return memberItem.role || (memberItem.bio?.substring(0, 100) + '...') || '';
      } else {
        const plataformaItem = item as Plataforma;
        return `${plataformaItem.type} • ${plataformaItem.access}`;
      }
    };

    return (
      <div className="full-person">
        <Image 
          src={imagePath}
          alt={item.name}
          width={74}
          height={74}
          onError={(e) => {
            // Fallback para imagem quebrada
            (e.target as HTMLImageElement).src = '/icons/default.jpg';
          }}
        />
        <div className="fp-info">
          <strong>{item.name}</strong>
          <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>
            {getDescription()}
          </p>
          <div className="fp-links">
            {Object.entries(links).map(([platform, linkData]: [string, any]) => (
              <a 
                key={platform} 
                href={linkData.url} 
                className="link-btn" 
                target="_blank" 
                rel="noopener noreferrer"
                title={linkData.label || platform}
              >
                {linkData.icon || platform.charAt(0).toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  export default function FullSection({ 
    members = [], 
    portavoze = [], 
    plataformas = [] 
  }: FullSectionProps) {
    const [featuredMembers, setFeaturedMembers] = useState<Member[]>([]);

    useEffect(() => {
      // Filtra membros featured
      const featured = members.filter(member => member.featured);
      setFeaturedMembers(featured);
    }, [members]);

    return (
      <>
        {/* PRODUÇÃO INTELECTUAL COMPLETA */}
        <section id="sec-producao" className="full-section author">
          <h2 className="section-title">Produção Intelectual – Completo</h2>
          <div id="lista-producao" className="full-list list-author">
            {featuredMembers.length > 0 ? (
              featuredMembers.map(member => (
                <FullPersonCard key={member.id} item={member} type="member" />
              ))
            ) : (
              <p style={{ textAlign: 'center', opacity: 0.7 }}>Nenhum membro encontrado</p>
            )}
          </div>
        </section>
        <div className="clear"></div>

        {/* PORTA-VOZES COMPLETO */}
        <section id="sec-portavozes" className="full-section">
          <h2 className="section-title">Porta-vozes – Completo</h2>
          <div id="lista-portavoze" className="full-list">
            {portavoze.length > 0 ? (
              portavoze.map(item => (
                <FullPersonCard key={item.id} item={item} type="portavoz" />
              ))
            ) : (
              <p style={{ textAlign: 'center', opacity: 0.7 }}>Nenhum porta-voz encontrado</p>
            )}
          </div>
        </section>

        {/* PLATAFORMAS COMPLETO */}
        <section id="sec-plataformas" className="full-section">
          <h2 className="section-title">Plataformas – Completo</h2>
          <div id="lista-plataformas" className="full-list">
            {plataformas.length > 0 ? (
              plataformas.map(item => (
                <FullPersonCard key={item.id} item={item} type="plataforma" />
              ))
            ) : (
              <p style={{ textAlign: 'center', opacity: 0.7 }}>Nenhuma plataforma encontrada</p>
            )}
          </div>
        </section>
      </>
    );
  }