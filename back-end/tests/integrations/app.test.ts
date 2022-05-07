import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app.js";
import { createRecommendation } from "../factories/recommendationsFactory.js";

describe("Integration Tests", () => {
  describe("POST /recommendation", () => {
    it("should return success", async () => {
      const body = {
        name: faker.name.findName(),
        youtubeLink: `https://www.youtube.com/${faker.datatype.uuid()}`,
      };

      const response = await supertest(app).post("/recommendations").send(body);

      expect(response.status).toBe(201);
    });
  });

  describe("POST /recommendation/:id/upvote", () => {
    it("should return success", async () => {
      const data = await createRecommendation();

      const response = await supertest(app)
        .post(`/recommendations/${data.id}/upvote`)
        .send();

      expect(response.status).toBe(200);
    });
  });
});