import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import model from '../models';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

const { Member } = model;

const vendorToken = jwt.sign({
    firstname: 'Samuel', 
    lastname: 'Manzi', 
    email: 'adafiamanzi.samuel@andela.com', 
    isadmin: true }, process.env.SECRET_KEY);

describe('Member tests', () => {
    before(()=>{
        const memberEmail = {
            "email":"domdom@gmail.com",
        };
        Member.destroy({
            where: {
                email: memberEmail.email
            }
        });
    });

    const vendorData = {
        "id":1,
        "email":"manzi.samuel@andela.com",
    };
    const token = jwt.sign(vendorData, process.env.SECRET_KEY);
    it('should not create a member because no token provided', (done) => {
        const memberData = {
            "firstname":"dominique",
            "lastname":"dom58",
            "email":"domdom@gmail.com",
            "type":"non-paying",
        };
          chai.request(server)
         .post('/api/vendors/members')
         .send(memberData)
         .end((err, res) => {
             res.body.status.should.be.eql(401);
             done();
         });
          
    });

    it('should not create a member because email is invalid', (done) => {
        const memberData = {
            "firstname":"dominique",
            "lastname":"dom58",
            "email":"domdomgmail.com",
            "type":"non-paying",
        };
          chai.request(server)
         .post('/api/vendors/members')
         .set('token', token)
         .send(memberData)
         .end((err, res) => {
             res.body.status.should.be.eql(400);
             done();
         });
          
    });

    it('should not create a member because some field have not well formatted', (done) => {
        const memberData = {
            "firstname":"do",
            "lastname":"do",
            "email":"domdom@gmail.com",
            "type":"non-payinggs",
        };
          chai.request(server)
         .post('/api/vendors/members')
         .set('token', token)
         .send(memberData)
         .end((err, res) => {
             res.body.status.should.be.eql(400);
         });
          done();
    });
    
    it('should not create a member because all field are required', (done) => {
        const memberData = {
            "firstname":"",
            "lastname":"",
            "email":"",
            "type":""
        };
          chai.request(server)
         .post('/api/vendors/members')
         .set('token', token)
         .send(memberData)
         .end((err, res) => {
             res.body.status.should.be.eql(400);
             done();
         });
          
    });

    it('should create a member', (done) => {
        const memberData = {
            "firstname":"dominique",
            "lastname":"dom58",
            "email":"domdom@gmail.com",
            "type":"non-paying",
            "owner": vendorData.id,
        };
          chai.request(server)
         .post('/api/vendors/members')
         .set('token', token)
         .send(memberData)
         .end((err, res) => {
            expect(res.body).to.be.an('object');
            done();
         });
          
    });
});

describe('Member tests', () => {
    it('should be able to update a member', (done) => {
      const member = {
        firstname: 'David',
        lastname: 'Mantey',
        email: 'mantey@gmail.com',
        type: 'paying'
      };
        chai.request(server)
       .patch('/api/members/1')
       .set('token', `${vendorToken}`)
       .send(member)
       .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.deep.equal(200);
            expect(res.body.message).to.be.a('string');
            // expect(res.body.firstname).to.deep.equal('David');
            // expect(res.body.email).to.deep.equal('mantey@gmail.com');
            done();
       });
        
    });
});
