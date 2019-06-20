import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app";
import model from "../models";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

const { Member } = model;

const venderInfo = {id: 1, firstname: 'Samuel', lastname: 'Manzi', email: 'adafiamanzi.samuel@andela.com', isadmin: true };
const vendorToken = jwt.sign(venderInfo, process.env.SECRET_KEY || "fg2h3j4576454f3gh");

describe("Member tests", () => {
  before(() => {
    const memberEmail = {
      email: "domdom@gmail.com"
    };
    Member.destroy({
      where: {
        email: memberEmail.email
      }
    });
  });

  const vendorData = {
    id: 1,
    email: "manzi.samuel@andela.com"
  };
  const token = jwt.sign(vendorData, process.env.SECRET_KEY || "gh23j45lk65k4kj3");
  it("should not create a member because no token provided", done => {
    const memberData = {
      firstname: "dominique",
      lastname: "dom58",
      email: "domdom@gmail.com",
      type: "non-paying"
    };
    chai
      .request(server)
      .post("/api/vendors/members")
      .send(memberData)
      .end((err, res) => {
        res.body.status.should.be.eql(401);
        done();
      });
  });

  it("should create a member", done => {
    const memberData = {
      firstname: "dominique",
      lastname: "dom58",
      email: "domdom@gmail.com",
      type: "non-paying",
      owner: vendorData.id
    };
    chai
      .request(server)
      .post("/api/vendors/members")
      .set("token", token)
      .send(memberData)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        
      });
      done();
  });
});
