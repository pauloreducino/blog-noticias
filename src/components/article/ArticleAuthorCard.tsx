import Link from 'next/link';
import Image from 'next/image';
import { getAuthorBySlug } from '@/lib/wordpress';

interface Props {
  author: { id: string; name: string; slug: string; avatar: string; role?: string };
}

export async function ArticleAuthorCard({ author }: Props) {
  const fullAuthor = await getAuthorBySlug(author.slug);

  return (
    <div className="mt-10 p-6 bg-surface rounded-2xl border border-cyan/15">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4">Sobre o autor</p>
      <div className="flex items-start gap-4">
        <Link href={`/autor/${author.slug}`} className="shrink-0">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan/30">
            <Image src={author.avatar} alt={author.name} fill className="object-cover" sizes="64px" />
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/autor/${author.slug}`} className="hover:text-cyan transition-colors">
            <h3 className="font-headline font-bold text-text-primary text-lg leading-tight">{author.name}</h3>
          </Link>
          {(author.role || fullAuthor?.role) && (
            <p className="font-mono text-[10px] text-cyan tracking-wider mt-0.5">
              {fullAuthor?.role || author.role}
            </p>
          )}
          {fullAuthor?.bio && (
            <p className="font-body text-sm text-text-muted leading-relaxed mt-2">{fullAuthor.bio}</p>
          )}

          {/* Social links */}
          {fullAuthor?.social && (
            <div className="flex flex-wrap gap-2 mt-3">
              {fullAuthor.social.twitter && (
                <a href={fullAuthor.social.twitter} target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-elevated border border-white/8 hover:border-cyan/30 font-mono text-[10px] text-text-muted hover:text-text-primary transition-all">
                  Twitter/X
                </a>
              )}
              {fullAuthor.social.instagram && (
                <a href={fullAuthor.social.instagram} target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-elevated border border-white/8 hover:border-cyan/30 font-mono text-[10px] text-text-muted hover:text-text-primary transition-all">
                  Instagram
                </a>
              )}
              {fullAuthor.social.linkedin && (
                <a href={fullAuthor.social.linkedin} target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-elevated border border-white/8 hover:border-cyan/30 font-mono text-[10px] text-text-muted hover:text-text-primary transition-all">
                  LinkedIn
                </a>
              )}
            </div>
          )}

          <Link
            href={`/autor/${author.slug}`}
            className="inline-flex items-center gap-1 mt-3 font-mono text-[11px] text-cyan hover:text-cyan/80 transition-colors"
          >
            Ver todos os artigos →
          </Link>
        </div>
      </div>
    </div>
  );
}
