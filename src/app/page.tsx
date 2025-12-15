// src/app/page.tsx
import Header from '@/components/Header/Header';
import Menu from '@/components/Menu/Menu';
import Intro from '@/components/Intro/Intro';
import GridSection from '@/components/GridSection/GridSection';
import FullSection from '@/components/FullSection/FullSection';
import ArtigosSection from '@/components/ArtigosSection/ArtigosSection';
import Footer from '@/components/Footer/Footer';
import { getMembers, getPortavoze, getPlataformas, getFeaturedArtigos } from '@/lib/data';

export default async function Home() {
  // Carrega tudo em paralelo
  const [members, portavoze, plataformas, featuredArtigos] = await Promise.all([
    getMembers(),
    getPortavoze(),
    getPlataformas(),
    getFeaturedArtigos()
  ]);

  return (
    <>
      <Menu />
      <Header />
      <main>
        <Intro />
        <GridSection 
          members={members} 
          portavoze={portavoze} 
          plataformas={plataformas} 
        />
        <FullSection 
          members={members} 
          portavoze={portavoze} 
          plataformas={plataformas} 
        />
        <ArtigosSection initialArtigos={featuredArtigos} />
      </main>
      <Footer />
    </>
  );
}