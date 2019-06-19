import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import { getMaxListeners } from 'cluster';
import expect from 'expect.js';

chai.use(chaiHttp);
chai.should();

// vendor signin tests -----------------------------------------------------
describe('Vendor tests', () => {
      it('should be able to signup', (done) => {
        const vendor = {
            "firstname": "Eleman",
            "lastname": "huhu",
            "email": "manzif57@gmail.com",
            "password": "Password12",
        }
          chai.request(server)
        .post('/api/vendors/')
        .send(vendor)
        .end((err, res) => {
            res.status.should.be.eql(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');  
            res.body.data.should.have.property('firstname'); 
            res.body.data.should.have.property('lastname');  
            res.body.data.should.have.property('email');       
        })
          done()
      });
      it('should not be able to signup without one of the required properties', (done) => {
        const vendor = {
            "firstname": "",
            "lastname": "huhu",
            "email": "manzif57@gmail.com",
            "password": "Password12",
        }
          chai.request(server)
         .post('/api/vendors/')
         .send(vendor)
         .end((err, res) => {
             res.body.Errors.should.be.a('array');
         })
          done()
      });
    it('should be able to signin', (done) => {
      const vendor = {
        "email": "manzi.samuel@andela.com",
        "password": "Manzi56Sam"
      }
        chai.request(server)
       .post('/api/login/')
       .send(vendor)
       .end((err, res) => {
           res.status.should.be.eql(200);
           
       })
        done()
    });
    it('should not be able to signin with incorrect password', (done) => {
      const vendor = {
        "email": "manzi.samuel@andela.com",
        "password": "password"
      }
        chai.request(server)
       .post('/api/login/')
       .send(vendor)
       .end((err, res) => {
           res.body.status.should.be.eql(401);
           res.body.error.should.be.a('string');
           
       })
        done()
    });
    it('should not be able to signin with wrong username', (done) => {
      const vendor = {
        "email": "zzz@andela.com",
        "password": "Manzi56Sam"
      }
        chai.request(server)
       .post('/api/login/')
       .send(vendor)
       .end((err, res) => {
           res.body.status.should.be.eql(404);
           res.body.message.should.be.a('string');
           
       })
        done()
    });
})