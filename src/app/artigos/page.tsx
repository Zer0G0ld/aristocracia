import { getArtigos } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function ArtigosPage() {
  const artigos = await getArtigos();

  return (
    <div className="container">
      <header className="page-header">
        <h1>Artigos</h1>
        <p>Conteúdo em destaque da comunidade</p>
      </header>

      <div className="filters">
        <button className="filter-btn active">Todos</button>
        <button className="filter-btn">Em Destaque</button>
        <button className="filter-btn">Por categoria</button>
      </div>

      <div className="articles-grid">
        {artigos.map(artigo => (
          <article key={artigo.id} className="article-card">
            <Link href={`/artigos/${artigo.id}`}>
              <div className="article-image">
                <Image
                  src={artigo.image}
                  alt={artigo.title}
                  width={400}
                  height={250}
                />
                <span className="category-badge">{artigo.category}</span>
              </div>
              
              <div className="article-content">
                <h3>{artigo.title}</h3>
                <p className="article-excerpt">
                  {artigo.description.substring(0, 150)}...
                </p>
                
                <div className="article-meta">
                  <span className="author">por {artigo.author}</span>
                  <span className="read-time">{artigo.readTime}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}