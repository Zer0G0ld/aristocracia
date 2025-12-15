// src/components/GridSection/GridSection.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Member, Portavoz, Plataforma } from '@/lib/types';
import { GridSectionProps, MiniPersonCardProps } from '../types';
import styles from './GridSection.module.css';

function MiniPersonCard({ person }: MiniPersonCardProps) {
  // Remove "./public" do caminho da imagem
  const imagePath = person.img?.replace('./public/', '/') || '/icons/default.jpg';

  return (
    <div className="person">
      <Image 
        src={imagePath}
        alt={person.name}
        width={62}
        height={62}
      />
      <span>{person.name}</span>
    </div>
  );
}

export default function GridSection({ 
  members = [], 
  portavoze = [], 
  plataformas = [] 
}: GridSectionProps) {
  const [randomMembers, setRandomMembers] = useState<(Member | Portavoz | Plataforma)[]>([]);
  const [randomPortavoze, setRandomPortavoze] = useState<(Member | Portavoz | Plataforma)[]>([]);
  const [randomPlataformas, setRandomPlataformas] = useState<(Member | Portavoz | Plataforma)[]>([]);

  useEffect(() => {
    // Seleciona aleatoriamente (máximo 3)
    const getRandom = <T,>(arr: T[], count = 3): T[] => {
      if (!arr || arr.length === 0) return [];
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(count, arr.length));
    };

    setRandomMembers(getRandom(members));
    setRandomPortavoze(getRandom(portavoze));
    setRandomPlataformas(getRandom(plataformas));

    // Atualiza a cada 15 segundos se houver dados
    if (members.length > 3 || portavoze.length > 3 || plataformas.length > 3) {
      const interval = setInterval(() => {
        setRandomMembers(getRandom(members));
        setRandomPortavoze(getRandom(portavoze));
        setRandomPlataformas(getRandom(plataformas));
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [members, portavoze, plataformas]);

  return (
    <section className="grid">
      {/* PRODUÇÃO INTELECTUAL */}
      <div className="col">
        <h3 className="col-title">Produção Intelectual</h3>
        <div id="mini-producao">
          {randomMembers.length > 0 ? (
            randomMembers.map(person => (
              <MiniPersonCard key={person.id} person={person} />
            ))
          ) : (
            <div className="person">
              <span>Carregando...</span>
            </div>
          )}
        </div>
        <a href="#sec-producao" className="btn">CONHEÇA</a>
      </div>

      {/* PORTA-VOZES */}
      <div className="col">
        <h3 className="col-title">Porta-vozes</h3>
        <div id="mini-portavoze">
          {randomPortavoze.length > 0 ? (
            randomPortavoze.map(person => (
              <MiniPersonCard key={person.id} person={person} />
            ))
          ) : (
            <div className="person">
              <span>Carregando...</span>
            </div>
          )}
        </div>
        <a href="#sec-portavozes" className="btn">CONHEÇA</a>
      </div>

      {/* PLATAFORMAS */}
      <div className="col">
        <h3 className="col-title">Plataformas</h3>
        <div id="mini-plataformas">
          {randomPlataformas.length > 0 ? (
            randomPlataformas.map(platform => (
              <MiniPersonCard key={platform.id} person={platform} />
            ))
          ) : (
            <div className="person">
              <span>Carregando...</span>
            </div>
          )}
        </div>
        <a href="#sec-plataformas" className="btn">CONHEÇA</a>
      </div>
    </section>
  );
}