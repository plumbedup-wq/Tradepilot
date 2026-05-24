type AuthResult = { error: { message: string } | null };

type SignUpInput = {
  email: string;
  password: string;
  options?: { data?: Record<string, unknown>; emailRedirectTo?: string };
};

const storageKey = "tp_session_token";

function getEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    throw new Error("Missing Supabase environment variables");
  }

  return { url, anon };
}

async function post(path: string, body: Record<string, unknown>) {
  const { url, anon } = getEnv();

  const response = await fetch(`${url}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anon
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return { response, data };
}

function saveSession(accessToken?: string) {
  if (!accessToken) return;
  document.cookie = "tp_session=1; Path=/; SameSite=Lax";
  localStorage.setItem(storageKey, accessToken);
}

export function createClient() {
  return {
    auth: {
      async signUp(input: SignUpInput): Promise<AuthResult> {
        const { response, data } = await post("/auth/v1/signup", {
          email: input.email,
          password: input.password,
          data: input.options?.data,
          email_redirect_to: input.options?.emailRedirectTo
        });

        if (!response.ok) {
          return { error: { message: data.msg ?? "Sign up failed" } };
        }

        saveSession(data.access_token);
        return { error: null };
      },

      async signInWithPassword(input: { email: string; password: string }): Promise<AuthResult> {
        const { response, data } = await post("/auth/v1/token?grant_type=password", input);

        if (!response.ok) {
          return { error: { message: data.error_description ?? "Login failed" } };
        }

        saveSession(data.access_token);
        return { error: null };
      },

      async signOut() {
        document.cookie = "tp_session=; Path=/; Max-Age=0; SameSite=Lax";
        localStorage.removeItem(storageKey);
      }
    }
  };
}
