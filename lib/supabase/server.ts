import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return {
    auth: {
      async getUser() {
        const session = cookieStore.get("tp_session")?.value;

        return {
          data: {
            user: session ? { email: "authenticated@user" } : null
          }
        };
      }
    }
  };
}
