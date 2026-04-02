import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as cheerio from "cheerio";

export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), "d 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  } catch {
    return dateString;
  }
}

export function formatDateShort(dateString: string): string {
  try {
    return format(parseISO(dateString), "dd/MM/yyyy", { locale: ptBR });
  } catch {
    return dateString;
  }
}

export function formatRelative(dateString: string): string {
  try {
    return formatDistanceToNow(parseISO(dateString), {
      locale: ptBR,
      addSuffix: true,
    });
  } catch {
    return dateString;
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export function getReadingTimeLabel(minutes: number): string {
  return `${minutes} min de leitura`;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function generateToc(html: string): {
  toc: TocItem[];
  modifiedHtml: string;
} {
  const $ = cheerio.load(html);
  const toc: TocItem[] = [];

  $("h1, h2, h3, h4, h5, h6").each((_, element) => {
    const $el = $(element);
    const text = $el.text().trim();
    if (text) {
      const level = parseInt($el.prop("tagName").charAt(1));
      const id = slugify(text);
      $el.attr("id", id); // Add id to the heading
      toc.push({ id, text, level });
    }
  });

  return { toc, modifiedHtml: $.html() };
}

export function getShareUrl(
  platform: "whatsapp" | "twitter" | "facebook" | "telegram",
  url: string,
  title: string,
): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const urls = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };
  return urls[platform];
}

export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME || "São Luís em Foco";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  "O portal de notícias de São Luís e do Maranhão";
