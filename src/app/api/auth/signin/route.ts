import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  console.log("Signin route - received:", { email });

  // Use real backend authentication
  const useMock = false;

  if (useMock) {
    // Mock authentication for testing
    if (email === "mateus@example.com" && password === "1234") {
      const authData = {
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

      (await cookies()).set("auth_session", JSON.stringify(authData), {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 3600,
      });

      console.log("Signin route - mock login successful");
      return NextResponse.json({
        ok: true,
        tokenType: authData.tokenType,
        accessToken: authData.accessToken,
        user: authData.user,
      });
    }

    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    );
  }

  // Real backend call
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const backendResponse = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Backend response status:", backendResponse.status);

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error("Backend error:", errorText);
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: backendResponse.status }
      );
    }

    const authData = await backendResponse.json();
    console.log("Backend auth data:", authData);

    // Add user data to the response (backend doesn't include it)
    const enrichedAuthData = {
      ...authData,
      user: {
        id: authData.subject,
        email: email,
        // These would need to be fetched from /api/users/me after login
        name: "User",
        role: "CLIENT",
      },
    };

    (await cookies()).set("auth_session", JSON.stringify(enrichedAuthData), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: authData.expiresIn || 3600,
    });

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
      { status: 500 }
    );
  }
}
