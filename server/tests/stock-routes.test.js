const request = require("supertest");
const app = require("../app");
const updateStockStatus = require("../jobs/stock_status.jobs");
const cron = require("node-cron");

let token;

beforeAll((done) => {
  request(app)
    .post("/auth/login")
    .send({
      email: "taramills@gmail.com",
      password: "Tara2082dn5123!",
    })
    .expect(200)
    .end((err, response) => {
      if (err) return done(err);
      token = response.body.accessToken;
      return done();
    });
});

//add mock data

describe("Add a stock (creation of a book inside a bookstore) ", () => {
  it("should create a new stock", async () => {
    const res = await request(app)
      .post("/stock/add")
      .send({
        ISBN: 1001001001013,
        bookstoreId: 2,
        quantity: 10,
      })
      .set("Authorization", `Bearer ${token}`);

    //TODO: check why bigInt is returning a string.
    expect(res.statusCode).toEqual(201);
    expect(res.body.stock).toBeInstanceOf(Object);
    expect(res.body.stock.isbn).toEqual("1001001001013");
    expect(res.body.stock.bookstore_id).toEqual(2);
    expect(res.body.stock.quantity).toEqual(10);
    expect(res.body.stock.status).toEqual("in stock");
  });
  it("should not create a new stock when the isbn does not exist", async () => {
    const res = await request(app)
      .post("/stock/add")
      .send({
        ISBN: 1001001011111,
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
        ISBN: 1001001001013,
        bookstoreId: 200,
        quantity: 10,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(400);
  });

  it("should not create a new stock when a stock exists for a book in a bookstore", async () => {
    const res = await request(app)
      .post("/stock/add")
      .send({
        ISBN: 1001001001013,
        bookstoreId: 2,
        quantity: 10,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(400);
  });
});

describe("Update a book's stock level to be out of stock", () => {
  it("should update stock quantity to 0", async () => {
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

// jest.mock mocks the node-cron module with jest. The second argument specifies an explicit module factory
// that runs instead of running node cron-with Jest's auto-mocked version.
//jest.fn() creates a mock function
jest.mock("node-cron", () => {
  return {
    schedule: jest.fn(),
  };
});

describe("Update a book's inventory status", () => {
  it("should run the check status job", async () => {
    cron.schedule.mockImplementationOnce(updateStockStatus());
    expect(cron.schedule).toBeCalledWith("* * * * *", expect.any(Function));
  });

  it("should update status to out of stock for stock with quantity 0", async () => {
    const res = await request(app)
      .get("/stock/1/1001001001012")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.stock).toBeInstanceOf(Object);
    expect(res.body.stock.stock_id).toEqual(1);
    expect(res.body.stock.quantity).toEqual(0);
    expect(res.body.stock.status).toEqual("out of stock");
  });

  it("should not update status to out of stock for stock with quantity higher than 0", async () => {
    const res = await request(app)
      .get("/stock/2/1001001001013")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.stock).toBeInstanceOf(Object);
    expect(res.body.stock.stock_id).toEqual(2);
    expect(res.body.stock.quantity).toEqual(10);
    expect(res.body.stock.status).toEqual("in stock");
  });
});
