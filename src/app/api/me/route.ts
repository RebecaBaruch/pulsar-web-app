import { NextResponse } from "next/server";
import { getSessionCookie } from "@/auth/services/sessionService";
import { jwtDecode } from "jwt-decode";

export async function GET(req: Request) {
  // Try to get session from cookie (httpOnly)
  let session = await getSessionCookie();

  // If no cookie, try to get token from Authorization header
  if (!session) {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      try {
        const decoded = jwtDecode(token);
        session = { accessToken: token, user: decoded };
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }

  if (!session || !session.user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // Retorna os dados completos do usuário armazenados na sessão
  return NextResponse.json({ user: session.user });
}

// import { AuthUser } from "@/auth/authTypes";
// import React from "react";

// const { user, loading } = useAuth({
//   mock: true,
// });

// function useAuth({ mock = false } = {}) {
//   const [user, setUser] = React.useState<AuthUser | null>(null);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     if (mock) {
//       setUser({
//         id: "1",
//         name: "Teste",
//         email: "teste@example.com",
//         role: "CLIENT",
//       });
//       setLoading(false);
//       return;
//     }

//     fetch("/api/auth/me")
//       .then((res) => res.json())
//       .then(setUser)
//       .catch(() => setUser(null))
//       .finally(() => setLoading(false));
//   }, []);

//   return { user, loading };
// }
