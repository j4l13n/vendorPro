import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app";

chai.use(chaiHttp);
chai.should();

/**
 * Tests for Vendor
 */
describe("Vendor tests", () => {
  it("should be able to signin", done => {
    const vendor = {
      email: "manzi.samuel@andela.com",
      password: "Manzi56Sam"
    };
    chai
      .request(server)
      .post("/api/login/")
      .send(vendor)
      .end((err, res) => {
        res.body.status.should.be.eql(200);
        done();
      });
  });
  it("should not be able to signin with incorrect password", done => {
    const vendor = {
      email: "manzi.samuel@andela.com",
      password: "password"
    };
    chai
      .request(server)
      .post("/api/login/")
      .send(vendor)
      .end((err, res) => {
        res.body.status.should.be.eql(401);
        res.body.error.should.be.a("string");
        done();
      });
  });
  it("should not be able to signin with wrong username", done => {
    const vendor = {
      email: "zzz@andela.com",
      password: "Manzi56Sam"
    };
    chai
      .request(server)
      .post("/api/login/")
      .send(vendor)
      .end((err, res) => {
        res.body.status.should.be.eql(404);
        res.body.message.should.be.a("string");
        done();
      });
  });
});
