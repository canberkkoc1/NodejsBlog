const request = require('supertest')
const app = require("../../app")
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");



let mongoServer;
let post;
let token;


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()

    const mongoURI = mongoServer.getUri

    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    const userData = { username: "testUser", password: "password",email:"ck@ck111.com", role:"admin" }

     await request(app)
        .post("/api/v1/users/signup")
        .send(userData)


        const loginResponse = await request(app)
        .post("/api/v1/users/signin") // Giriş yapıyoruz
        .send({ email: userData.email, password: userData.password });

        token = loginResponse.headers['set-cookie'][0].split(';')[0].split('=')[1];

},1000)

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });


describe("Post API Create Test", () => {
    it("Should create post with a valid token",async () => {
        const postData= {
            title:'Test 1 post',
            content:'test 1 post content'
        }

        const response = await request(app)
            .post("/api/v1/post")
            .set("Cookie", `COOKIE_NAME=${token}`)
            .send(postData)

        
        expect(response.status).toBe(201)
        expect(response.body.status).toBe("success")

    })
})

