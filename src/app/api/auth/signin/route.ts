import { NextResponse } from "next/server";
import { setSession } from "@/auth/services/sessionService";
import { jwtDecode } from "jwt-decode";
import { AuthResponse } from "@/auth/authTypes";

function normalizeRole(role: unknown): "CLIENT" | "SPECIALIST" {
  return role === "SPECIALIST" ? "SPECIALIST" : "CLIENT";
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const useMock = false;

  if (useMock) {
    if (email === "mateus@example.com" && password === "1234") {
      const authData: AuthResponse = {
        accessToken: "mock-jwt-token-" + Date.now(),
        tokenType: "Bearer",
        subject: "user-123-uuid",
        issuedAt: new Date().toISOString(),
        expiresIn: 3600,
        user: {
          id: "user-123-uuid",
          name: "Mateus",
          email: "mateus@example.com",
          role: "CLIENT",
        },
      };

      await setSession(authData);

      return NextResponse.json({
        ok: true,
        tokenType: authData.tokenType,
        accessToken: authData.accessToken,
        user: authData.user,
      });
    }

    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 },
    );
  }

  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const backendResponse = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      return NextResponse.json(
        {
          error: `Backend error: ${backendResponse.status} ${backendResponse.statusText}`,
          details: errorText,
        },
        { status: backendResponse.status },
      );
    }

    const authData = await backendResponse.json();
    const accessToken =
      (typeof authData.accessToken === "string" && authData.accessToken) ||
      (typeof authData.token === "string" && authData.token) ||
      "";

    let decodedToken: Record<string, unknown> = {};

    try {
      if (accessToken) {
        decodedToken = jwtDecode(accessToken) as Record<string, unknown>;
      }
    } catch (e) {
      console.error("Error decoding JWT:", e);
    }

    const decodedName =
      typeof decodedToken.name === "string"
        ? decodedToken.name
        : typeof decodedToken.fullName === "string"
          ? decodedToken.fullName
          : undefined;

    const enrichedAuthData: AuthResponse = {
      ...authData,
      accessToken,
      user: {
        id: String(decodedToken.sub ?? authData.subject ?? ""),
        email,
        name: decodedName || email,
        role: normalizeRole(decodedToken.role ?? authData.role),
      },
    };

    await setSession(enrichedAuthData);

    return NextResponse.json({
      ok: true,
      tokenType: authData.tokenType,
      accessToken: authData.token || authData.accessToken,
      user: enrichedAuthData.user,
    });
  } catch (error) {
    console.error("Signin route error:", error);
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 },
    );
  }
}
