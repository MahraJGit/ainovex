const AUTH_KEY = "ainovex_admin_auth";

export type AdminSession = {
  email: string;
  loggedInAt: string;
};

/** Demo credentials — frontend only, replace with real auth later */
export const DEMO_ADMIN = {
  email: "admin@ainovex.com",
  password: "admin123",
} as const;

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export function setAdminSession(email: string) {
  const session: AdminSession = {
    email,
    loggedInAt: new Date().toISOString(),
  };
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function verifyDemoCredentials(email: string, password: string) {
  return (
    email.trim().toLowerCase() === DEMO_ADMIN.email &&
    password === DEMO_ADMIN.password
  );
}
