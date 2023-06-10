const request = require("supertest");
const server = require("../index");

require("dotenv").config();

afterEach(async () => {
  server.close();
});

describe("POST /session", () => {
  it("create login session", async () => {
    const token = await request(server)
      .post("/session")
      .send({
        email: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
      })
      .set({
        Origin: "https://matematching.com",
        "Content-Type": "application/json",
        withCredentials: true,
      });

    expect(token.statusCode).toBe(201);
  });
});

describe("GET /user", () => {
  it("gets all users", async () => {
    const token = await request(server)
      .post("/session")
      .send({
        email: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
      })
      .set({
        Origin: "https://matematching.com",
        "Content-Type": "application/json",
        withCredentials: true,
      });

    expect(token.statusCode).toBe(201);

    const response = await request(server)
      .get("/user")
      .set({
        Origin: "https://matematching.com",
        Authorization: "Bearer " + token.body,
        "Content-Type": "application/json",
      });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /request", () => {
  it("gets requests from current user", async () => {
    const token = await request(server)
      .post("/session")
      .send({
        email: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
      })
      .set({
        Origin: "https://matematching.com",
        "Content-Type": "application/json",
        withCredentials: true,
      });

    expect(token.statusCode).toBe(201);

    const response = await request(server)
      .get("/request")
      .query({ from: process.env.TEST_USERNAME })
      .set({
        Origin: "https://matematching.com",
        Authorization: "Bearer " + token.body,
        "Content-Type": "application/json",
      });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /roommate", () => {
  it("gets a user's roommates", async () => {
    const token = await request(server)
      .post("/session")
      .send({
        email: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
      })
      .set({
        Origin: "https://matematching.com",
        "Content-Type": "application/json",
        withCredentials: true,
      });

    expect(token.statusCode).toBe(201);

    const response = await request(server)
      .get("/roommate")
      .query({ email: process.env.TEST_USERNAME })
      .set({
        Origin: "https://matematching.com",
        Authorization: "Bearer " + token.body,
        "Content-Type": "application/json",
      });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
