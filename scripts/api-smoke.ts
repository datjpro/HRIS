const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:3001";

function assertCondition(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  const health = await fetch(`${apiBaseUrl}/health`);
  assertCondition(health.ok, "Health endpoint failed");

  const registerEmail = `smoke-${Date.now()}@example.com`;
  const registerResponse = await fetch(`${apiBaseUrl}/api/v1/auth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email: registerEmail,
      password: "Smoke@123456",
      fullName: "Smoke Test User",
      department: "Technology",
      role: "EMPLOYEE"
    })
  });
  assertCondition(registerResponse.ok, "Register endpoint failed");

  const loginResponse = await fetch(`${apiBaseUrl}/api/v1/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email: registerEmail,
      password: "Smoke@123456"
    })
  });
  assertCondition(loginResponse.ok, "Login endpoint failed");

  const loginBody = (await loginResponse.json()) as {
    success: boolean;
    data?: { accessToken: string };
  };

  assertCondition(loginBody.success && Boolean(loginBody.data?.accessToken), "Missing access token");

  const meResponse = await fetch(`${apiBaseUrl}/api/v1/me`, {
    headers: {
      authorization: `Bearer ${loginBody.data!.accessToken}`
    }
  });
  assertCondition(meResponse.ok, "Protected /me endpoint failed");

  const unauthorizedResponse = await fetch(`${apiBaseUrl}/api/v1/me`);
  assertCondition(unauthorizedResponse.status === 401, "Unauthorized request should return 401");

  console.log("Smoke test passed");
}

main().catch((error) => {
  console.error("Smoke test failed", error);
  process.exit(1);
});

