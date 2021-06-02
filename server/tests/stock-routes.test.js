const request = require("supertest");
const app = require("../app");
const db = require("../db/db");

//TODO: fix open handle issue regarding cron.schedule; jest not exiting after tests are completed.

let token;

beforeAll((done) => {
  request(app)
    .post("/auth/login")
    .send({
      email: "taramills@gmail.com",
      password: "Tara2082dn5%123-!",
    })
    .end((err, response) => {
      token = response.body.accessToken;
      done();
    });
});

describe("Add a stock (creation of a book inside a bookstore) ", () => {
  it("should create a new stock", async () => {
    const res = await request(app)
      .post("/stock/add")
      .send({
        ISBN: 1001001002,
        bookstoreId: 2,
        quantity: 10,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(201);
    expect(res.body.stock).toBeInstanceOf(Object);
    expect(res.body.stock.isbn).toEqual(1001001002);
    expect(res.body.stock.bookstore_id).toEqual(2);
    expect(res.body.stock.quantity).toEqual(10);
    expect(res.body.stock.status).toEqual("in stock");
  });
  it("should not create a new stock when the isbn does not exist", async () => {
    const res = await request(app)
      .post("/stock/add")
      .send({
        ISBN: 1111111111,
        bookstoreId: 2,
        quantity: 10,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(400);
  });
  it("should not create a new stock when the bookstore id does not exist", async () => {
    const res = await request(app)
      .post("/stock/add")
      .send({
        ISBN: 1001001001,
        bookstoreId: 200,
        quantity: 10,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(400);
  });

  it("should not create a new stock when a stock entry exists for a book in a bookstore", async () => {
    const res = await request(app)
      .post("/stock/add")
      .send({
        ISBN: 1001001002,
        bookstoreId: 2,
        quantity: 10,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(400);
  });
});

describe("update a book's stock level to be out of stock", () => {
  it("should update stock quantity to 0 and status to out of stock", async () => {
    const res = await request(app)
      .patch("/stock/update")
      .send({
        stockId: 1,
        quantity: 0,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.updatedStock).toBeInstanceOf(Object);
    expect(res.body.updatedStock.stock_id).toEqual(1);
    expect(res.body.updatedStock.quantity).toEqual(0);
    expect(res.body.updatedStock.status).toEqual("in stock");
  });

  it("should not update a stock which does not exist", async () => {
    const res = await request(app)
      .patch("/stock/update")
      .send({
        stockId: 10,
        quantity: 100,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(400);
  });
});
