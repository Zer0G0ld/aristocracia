// src/app/producao-intelectual/[id]/page.tsx
import { getMemberById, getMembers } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const members = await getMembers();
  return members.map(member => ({
    id: member.id,
  }));
}

export default async function MemberPage({ params }: PageProps) {
  const { id } = await params;
  const member = await getMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <div className="container member-page">
      <div className="member-header">
        <div className="member-image">
          <Image
            src={member.img}
            alt={member.name}
            width={200}
            height={200}
          />
        </div>
        
        <div className="member-info">
          <h1>{member.name}</h1>
          <p className="member-role">{member.role}</p>
          <p className="member-bio">{member.bio}</p>
          
          <div className="member-stats">
            <div className="stat">
              <strong>{member.stats?.articlesCount || 0}</strong>
              <span>Artigos</span>
            </div>
            <div className="stat">
              <strong>{member.stats?.subscribers || 'N/A'}</strong>
              <span>Inscritos</span>
            </div>
            <div className="stat">
              <strong>{member.stats?.engagement || 'N/A'}</strong>
              <span>Engajamento</span>
            </div>
          </div>
        </div>
      </div>

      <div className="member-details">
        <div className="detail-section">
          <h3>Expertise</h3>
          <div className="tags">
            {member.expertise.map(skill => (
              <span key={skill} className="tag">{skill}</span>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Links</h3>
          <div className="links">
            {Object.entries(member.links).map(([platform, link]) => (
              <a
                key={platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-btn"
              >
                {link.icon} {link.label || platform}
              </a>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Conteúdo</h3>
          <div className="tags">
            {member.contentTypes.map(type => (
              <span key={type} className="tag">{type}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="back-link">
        <Link href="/producao-intelectual">← Voltar para Produção Intelectual</Link>
      </div>
    </div>
  );
}