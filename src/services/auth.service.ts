/**
 * Auth Service — login, register, token storage for teacher platform.
 */

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
const TOKEN_KEY = "tarkon_token";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  role: "teacher" | "student";
}

export interface AuthResult {
  access_token: string;
  token_type: string;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export async function login(payload: LoginPayload): Promise<AuthResult> {
  const form = new URLSearchParams();
  form.append("username", payload.email);
  form.append("password", payload.password);

  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Login failed (${res.status})`);
  }

  const data: AuthResult = await res.json();
  setToken(data.access_token);
  return data;
}

export async function register(payload: RegisterPayload): Promise<void> {
  const res = await fetch(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Registration failed (${res.status})`);
  }
}

export async function getMe(): Promise<{ id: number; email: string; role: string }> {
  const token = getToken();
  const res = await fetch(`${BASE}/auth/me`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
}
