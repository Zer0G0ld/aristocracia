// src/components/Destaque/Destaque.tsx
import Image from 'next/image';
import { Artigo } from '@/lib/types';
import { DestaqueProps } from '../types';

export default function Destaque({ destaques }: DestaqueProps) {
  return (
    <section id="destaque" className="destaque">
      <div className="center">
        <h2 className="section-title">Textos em Destaque</h2>
        <div className="textos">
          {destaques.map(destaque => (
            <div key={destaque.id} className="texto-singlo">
              <div className="info left">
                <Image 
                  src={destaque.image} 
                  alt={destaque.title}
                  width={500}
                  height={300}
                  className="info-img"
                />
              </div>
              <div className="info right">
                <a href={destaque.link} target="_blank" rel="noopener noreferrer">
                  {destaque.title}
                </a>
                <p>{destaque.description}</p>
                <h3>
                  autor: <a href={destaque.authorLink} target="_blank" rel="noopener noreferrer">
                    {destaque.author}
                  </a>
                </h3>
              </div>
            </div>
          ))}

          <div className="obs">
            <h3>
              os textos são escolhidos na aba:texto no{' '}
              <a href="https://discord.gg/XncGYt2Y7g" target="_blank" rel="noopener noreferrer">
                Discord:Aristocracia
              </a>{' '}
              e serão trocados aos domingos
            </h3>
          </div>
        </div>
      </div>
      <div className="clear"></div>
    </section>
  );
}