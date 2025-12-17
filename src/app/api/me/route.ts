import { NextResponse } from "next/server";
import { getSessionCookie } from "@/auth/services/sessionService";

export async function GET() {
  const session = await getSessionCookie();

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
