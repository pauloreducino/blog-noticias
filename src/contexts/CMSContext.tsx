"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Article, Author, Category } from "@/types";
import { articles as initialArticles } from "@/data/articles";
import { authors as initialAuthors } from "@/data/authors";
import { categories as initialCategories } from "@/data/categories";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: "image" | "video";
  size: string;
  uploadedAt: string;
  dimensions?: string;
}

interface CMSContextType {
  articles: Article[];
  addArticle: (article: Omit<Article, "id" | "publishedAt" | "views">) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  getArticleById: (id: string) => Article | undefined;

  categories: Category[];
  addCategory: (category: Omit<Category, "id" | "articleCount">) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  authors: Author[];
  addAuthor: (author: Omit<Author, "id" | "articleCount">) => void;
  updateAuthor: (id: string, author: Partial<Author>) => void;
  deleteAuthor: (id: string) => void;

  mediaFiles: MediaFile[];
  addMediaFile: (file: Omit<MediaFile, "id" | "uploadedAt">) => void;
  deleteMediaFile: (id: string) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Reads from localStorage on first render (lazy initializer).
// Falls back to the static seed data if nothing is saved yet.
function fromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const initialMedia: MediaFile[] = [
  {
    id: "1",
    name: "rua-portugal-9-scaled.webp",
    url: "/heros/rua-portugal-9-scaled.webp",
    type: "image",
    size: "2.3 MB",
    uploadedAt: "2024-01-15",
    dimensions: "1920x1080",
  },
  {
    id: "2",
    name: "sao-luis-ma-nitght.png",
    url: "/heros/sao-luis-ma-nitght.png",
    type: "image",
    size: "1.8 MB",
    uploadedAt: "2024-01-14",
    dimensions: "1600x900",
  },
];

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  // Lazy initialisers: state is read from localStorage on first render,
  // so there is no race between the "load" effect and the "save" effect.
  const [articles, setArticles] = useState<Article[]>(() =>
    fromStorage("cms_articles", initialArticles),
  );
  const [categoriesState, setCategories] = useState<Category[]>(() =>
    fromStorage("cms_categories", initialCategories),
  );
  const [authorsState, setAuthors] = useState<Author[]>(() =>
    fromStorage("cms_authors", initialAuthors),
  );
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(() =>
    fromStorage("cms_media", initialMedia),
  );
  const [isLoading, setIsLoading] = useState(false);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("cms_articles", JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem("cms_categories", JSON.stringify(categoriesState));
  }, [categoriesState]);

  useEffect(() => {
    localStorage.setItem("cms_authors", JSON.stringify(authorsState));
  }, [authorsState]);

  useEffect(() => {
    localStorage.setItem("cms_media", JSON.stringify(mediaFiles));
  }, [mediaFiles]);

  // Articles CRUD
  const addArticle = (
    articleData: Omit<Article, "id" | "publishedAt" | "views">,
  ) => {
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      views: 0,
    };
    setArticles((prev) => [newArticle, ...prev]);
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, ...updates } : article,
      ),
    );
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((article) => article.id !== id));
  };

  const getArticleById = (id: string) =>
    articles.find((article) => article.id === id);

  // Categories CRUD
  const addCategory = (
    categoryData: Omit<Category, "id" | "articleCount">,
  ) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
      articleCount: 0,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id ? { ...category, ...updates } : category,
      ),
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  // Authors CRUD
  const addAuthor = (authorData: Omit<Author, "id" | "articleCount">) => {
    const newAuthor: Author = {
      ...authorData,
      id: Date.now().toString(),
      articleCount: 0,
    };
    setAuthors((prev) => [...prev, newAuthor]);
  };

  const updateAuthor = (id: string, updates: Partial<Author>) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === id ? { ...author, ...updates } : author,
      ),
    );
  };

  const deleteAuthor = (id: string) => {
    setAuthors((prev) => prev.filter((author) => author.id !== id));
  };

  // Media CRUD
  const addMediaFile = (fileData: Omit<MediaFile, "id" | "uploadedAt">) => {
    const newFile: MediaFile = {
      ...fileData,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString().split("T")[0],
    };
    setMediaFiles((prev) => [newFile, ...prev]);
  };

  const deleteMediaFile = (id: string) => {
    setMediaFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const value: CMSContextType = {
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
    categories: categoriesState,
    addCategory,
    updateCategory,
    deleteCategory,
    authors: authorsState,
    addAuthor,
    updateAuthor,
    deleteAuthor,
    mediaFiles,
    addMediaFile,
    deleteMediaFile,
    isLoading,
    setIsLoading,
  };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
