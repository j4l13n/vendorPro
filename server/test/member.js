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

const venderInfo = {id: 1, firstname: 'Samuel', lastname: 'Manzi', email: 'adafiamanzi.samuel@andela.com', isadmin: true };
const vendorToken = jwt.sign(venderInfo, process.env.SECRET_KEY);

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
             
         });
         done();
          
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
             
         });
         done();
          
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
            
         });
         done();
          
    });
});

describe('Member tests', () => {
    before('A member should be created before updating test is run', async (done)=> {
        const memberData = {
            firstname:'Kwame',
            lastname:'Junior',
            email:'junior@gmail.com',
            type:'non-paying',
            owner: venderInfo.id,
        };
        chai.request(server)
         .post('/api/vendors/members')
         .set('token', vendorToken)
         .send(memberData)
         .end((err, res) => {
            expect(res.body).to.be.an('object');
         });
         done();
    });
    
    it('should not update a member if the id provided does not exist', (done) => {
        const member = {
            firstname:'Qwame',
            lastname:'Junior',
            email:'junior@gmail.com',
            type: 'paying'
        };
        chai.request(server)
       .patch('/api/members/1000')
       .set('token', `${vendorToken}`)
       .send(member)
       .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.deep.equal(404);
            expect(res.body.message).to.deep.equal('Member was not found');
            
       });
       done();
    });

    it('should not update a member if the id provided is not a positive number', (done) => {
        const member = {
            firstname:'Qwame',
            lastname:'Junior',
            email:'junior@gmail.com',
            type: 'paying'
        };
        chai.request(server)
       .patch('/api/members/-1')
       .set('token', `${vendorToken}`)
       .send(member)
       .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.deep.equal(400);
            expect(res.body.message).to.deep.equal(' memberId  must be a positive number');
            done();
       });
    });

    it('should not update a member if the id provided is a string', (done) => {
        const member = {
            firstname:'Qwame',
            lastname:'Junior',
            email:'junior@gmail.com',
            type: 'paying'
        };
        chai.request(server)
       .patch('/api/members/hjgh')
       .set('token', `${vendorToken}`)
       .send(member)
       .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.deep.equal(400);
            expect(res.body.message).to.deep.equal(' memberId  must be a number');
            done();
       });
    });

    it('should not to delete a member if the member id does not exist', (done) => {
        chai.request(server)
       .delete('/api/members/1000')
       .set('token', `${vendorToken}`)
       .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.deep.equal(404);
            expect(res.body.message).to.deep.equal(`Member was not found`);
            
       });
       done();

    });

    it('should not to delete a member if the member id is not positive', (done) => {
        chai.request(server)
       .delete('/api/members/-1')
       .set('token', `${vendorToken}`)
       .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.deep.equal(400);
            expect(res.body.message).to.deep.equal(' memberId  must be a positive number');
            done();
       });

    });

    it('should not to delete a member if the member id is a string', (done) => {
        chai.request(server)
       .delete('/api/members/string')
       .set('token', `${vendorToken}`)
       .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.deep.equal(400);
            expect(res.body.message).to.deep.equal(' memberId  must be a number');
            done();
       });

    });
});
