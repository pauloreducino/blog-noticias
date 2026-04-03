"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { AdminUser, Permission } from "@/types";
import { ROLE_PERMISSIONS } from "@/types";

const SESSION_KEY = "slf_admin_session";
const USERS_KEY = "slf_admin_users";

// Default super-admin that always exists
const DEFAULT_ADMIN: AdminUser = {
  id: "root",
  name: "Administrador",
  username: "admin",
  password: "saoluis@2024",
  email: "admin@saoluisemfoco.com.br",
  role: "admin",
  permissions: ROLE_PERMISSIONS.admin,
  createdAt: "2024-01-01T00:00:00.000Z",
  active: true,
};

interface Session {
  userId: string;
}

interface AuthContextType {
  currentUser: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  hasPermission: (p: Permission) => boolean;
  // User management
  users: AdminUser[];
  createUser: (data: Omit<AdminUser, "id" | "createdAt">) => { ok: boolean; error?: string };
  updateUser: (id: string, data: Partial<AdminUser>) => { ok: boolean; error?: string };
  deleteUser: (id: string) => { ok: boolean; error?: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadUsers(): AdminUser[] {
  if (typeof window === "undefined") return [DEFAULT_ADMIN];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const stored: AdminUser[] = raw ? JSON.parse(raw) : [];
    // Ensure default admin is always present with latest password if not overridden
    const hasRoot = stored.some((u) => u.id === "root");
    return hasRoot ? stored : [DEFAULT_ADMIN, ...stored];
  } catch {
    return [DEFAULT_ADMIN];
  }
}

function saveUsers(users: AdminUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<AdminUser[]>(() => loadUsers());
  const [session, setSession] = useState<Session | null>(() => loadSession());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const currentUser = session
    ? (users.find((u) => u.id === session.userId) ?? null)
    : null;

  const isAuthenticated = !!currentUser && currentUser.active;

  const hasPermission = (p: Permission): boolean => {
    if (!currentUser) return false;
    return currentUser.permissions.includes(p);
  };

  const login = (username: string, password: string) => {
    const user = users.find(
      (u) => u.username === username && u.password === password && u.active,
    );
    if (!user) {
      return { ok: false, error: "Usuário ou senha incorretos." };
    }
    const newSession: Session = { userId: user.id };
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    setSession(newSession);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  // ─── User CRUD ──────────────────────────────────────────────────────────────

  const createUser = (data: Omit<AdminUser, "id" | "createdAt">) => {
    if (users.some((u) => u.username === data.username)) {
      return { ok: false, error: "Este nome de usuário já está em uso." };
    }
    if (data.email && users.some((u) => u.email === data.email)) {
      return { ok: false, error: "Este e-mail já está em uso." };
    }
    const newUser: AdminUser = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...users, newUser];
    setUsers(updated);
    saveUsers(updated);
    return { ok: true };
  };

  const updateUser = (id: string, data: Partial<AdminUser>) => {
    if (
      data.username &&
      users.some((u) => u.username === data.username && u.id !== id)
    ) {
      return { ok: false, error: "Este nome de usuário já está em uso." };
    }
    const updated = users.map((u) => (u.id === id ? { ...u, ...data } : u));
    setUsers(updated);
    saveUsers(updated);
    // If editing own session user, refresh session so permissions apply immediately
    if (session?.userId === id) {
      setSession({ ...session });
    }
    return { ok: true };
  };

  const deleteUser = (id: string) => {
    if (id === "root") {
      return { ok: false, error: "O administrador padrão não pode ser excluído." };
    }
    if (session?.userId === id) {
      return { ok: false, error: "Não é possível excluir o usuário atual." };
    }
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    saveUsers(updated);
    return { ok: true };
  };

  const value: AuthContextType = {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasPermission,
    users,
    createUser,
    updateUser,
    deleteUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
