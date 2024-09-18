import type { HttpHandler, HttpResponseInit } from "@azure/functions";
import { app } from "@azure/functions";

const handler: HttpHandler = async (request, context) => {
  const response: HttpResponseInit = {
    body: JSON.stringify({ message: "I am alive 🤖" }),
    headers: { "Content-Type": "application/json" },
    status: 200,
  };

  return response;
};

app.http("health-check", {
  handler,
  methods: ["GET"],
  route: "api/health",
});
