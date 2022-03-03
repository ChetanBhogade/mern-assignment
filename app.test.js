const request = require("supertest");
const app = require("./app");

let token = "";

test("should return a access token", async () => {
  const test = await request(app).post("/login").expect(200);
  expect(test.body.accessToken).toBeDefined();
  token = test.body.accessToken;
});

test("should fetch all the users", async () => {
  const response = await request(app)
    .get("/users")
    .auth(token, { type: "bearer" })
    .expect(200);
  expect(response.body.result).toBeDefined();
});
