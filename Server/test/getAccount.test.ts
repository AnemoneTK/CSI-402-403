test("get user account with index 0", async () => {
  const response = await fetch(
    "http://localhost:10500/registration/getAccount",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        index: 0,
        isNext: false,
      }),
    }
  );
  expect(response.status).toBe(200);
});

test("login temp account", async () => {
  const response = await fetch("http://localhost:10500/registration/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "TA202503022",
      password: "577409",
    }),
  });
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data).toBeDefined();
  console.log("Response Data:", JSON.stringify(data));
  expect(data.data.token).toBeDefined();
  console.log("Token:", data.data.token);
});
