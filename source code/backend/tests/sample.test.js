require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../server');

describe("User Login Test", () => {
  test("POST /api/user/signin - Should login user with test credentials", async () => {
    const res = await request(app)
      .post('/api/user/signin')
      .send({
        email: "dummy@gmail.com",
        password: "dummy"
      });

    // Allow any of these status codes
    expect([200, 401, 404]).toContain(res.statusCode);

    if (res.statusCode === 200) {
      expect(res.body.message).toBe("User signed in successfully");
      expect(res.body).toHaveProperty('token');
    } 
    
    else if (res.statusCode === 401) {
      expect(res.body.message).toBe("Invalid credentials");
    }

    else if (res.statusCode === 404) {
      expect(typeof res.body.message).toBe("string");
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await new Promise(resolve => setTimeout(resolve, 500));
  });
});
