export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  bioLong?: string;
  avatar: string;
  social: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    email?: string;
  };
  areas: string[];
  since: string;
  articleCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
  description: string;
  articleCount?: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: {
    name: string;
    slug: string;
    color: string;
    icon?: string;
  };
  author: {
    id: string;
    name: string;
    slug: string;
    avatar: string;
    role?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  featured: boolean;
  breaking: boolean;
  views: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// ─── Users & Permissions ─────────────────────────────────────────────────────

export type Permission =
  | "articles.view_all"
  | "articles.view_own"
  | "articles.create"
  | "articles.edit_all"
  | "articles.edit_own"
  | "articles.delete_all"
  | "articles.delete_own"
  | "categories.manage"
  | "authors.manage"
  | "media.manage"
  | "analytics.view"
  | "settings.manage"
  | "users.manage";

export type UserRole = "admin" | "editor" | "author" | "custom";

export interface AdminUser {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  /** Links to the Author profile in the CMS (for role=author) */
  authorId?: string;
  avatar?: string;
  createdAt: string;
  active: boolean;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Administrador",
  editor: "Editor",
  author: "Autor",
  custom: "Personalizado",
};

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    "articles.view_all",
    "articles.view_own",
    "articles.create",
    "articles.edit_all",
    "articles.edit_own",
    "articles.delete_all",
    "articles.delete_own",
    "categories.manage",
    "authors.manage",
    "media.manage",
    "analytics.view",
    "settings.manage",
    "users.manage",
  ],
  editor: [
    "articles.view_all",
    "articles.view_own",
    "articles.create",
    "articles.edit_all",
    "articles.edit_own",
    "articles.delete_all",
    "articles.delete_own",
    "categories.manage",
    "authors.manage",
    "media.manage",
    "analytics.view",
  ],
  author: [
    "articles.view_own",
    "articles.create",
    "articles.edit_own",
    "articles.delete_own",
    "media.manage",
  ],
  custom: [],
};

export const PERMISSION_LABELS: Record<Permission, string> = {
  "articles.view_all": "Ver todos os artigos",
  "articles.view_own": "Ver próprios artigos",
  "articles.create": "Criar artigos",
  "articles.edit_all": "Editar qualquer artigo",
  "articles.edit_own": "Editar próprios artigos",
  "articles.delete_all": "Excluir qualquer artigo",
  "articles.delete_own": "Excluir próprios artigos",
  "categories.manage": "Gerenciar categorias",
  "authors.manage": "Gerenciar autores",
  "media.manage": "Gerenciar mídia",
  "analytics.view": "Ver analytics",
  "settings.manage": "Gerenciar configurações",
  "users.manage": "Gerenciar usuários",
};

export const PERMISSION_GROUPS: { label: string; perms: Permission[] }[] = [
  {
    label: "Artigos",
    perms: [
      "articles.view_all",
      "articles.view_own",
      "articles.create",
      "articles.edit_all",
      "articles.edit_own",
      "articles.delete_all",
      "articles.delete_own",
    ],
  },
  {
    label: "Conteúdo",
    perms: ["categories.manage", "authors.manage", "media.manage"],
  },
  {
    label: "Sistema",
    perms: ["analytics.view", "settings.manage", "users.manage"],
  },
];
