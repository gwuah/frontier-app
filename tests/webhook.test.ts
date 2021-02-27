import request from "supertest"
import server from "../app/server"

describe("Webhook", () => {
  it("tests that /callback works properly", async done => {
    const req = await request(server)
      .post("/callback")
      .send({})

    expect(req.body).toEqual({
        "message": "recieved",
        "status": true,
    });
    done();
  });
});