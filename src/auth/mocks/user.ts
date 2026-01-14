export const mockUser = {
  id: "123",
  name: "Rebeca Teste",
  email: "teste@exemplo.com",
  role: "CLIENT",
};

export const mockUsers = {
  client: {
    email: "client@example.com",
    password: "password123",
    response: {
      accessToken: "mock_token_client_123456789",
      tokenType: "Bearer",
      subject: "client@example.com",
      issuedAt: new Date().toISOString(),
      expiresIn: 3600,
      user: {
        id: "client-001",
        name: "Test Client",
        email: "client@example.com",
        role: "CLIENT" as const,
      },
    },
  },
  specialist: {
    email: "specialist@example.com",
    password: "password123",
    response: {
      accessToken: "mock_token_specialist_123456789",
      tokenType: "Bearer",
      subject: "specialist@example.com",
      issuedAt: new Date().toISOString(),
      expiresIn: 3600,
      user: {
        id: "specialist-001",
        name: "Test Specialist",
        email: "specialist@example.com",
        role: "SPECIALIST" as const,
      },
    },
  },
};