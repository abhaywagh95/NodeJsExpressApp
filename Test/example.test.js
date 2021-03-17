let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/getWebsiteContent call', () => {
    it('it should GET the initail response from api', (done) => {     
      chai.request(server)
          .get('/api')
          .end((err, res) => {           
                res.should.have.status(200);
                console.log(res.text);
                res.text.should.be.eql('Website metadata handler');                
            done();
          });
    }),
    it('it should return bad request from api', (done) => { 
      let object = { URL1 : 'https://www.youtube.com/watch?v=GN2nFJ9Ku6Q' };     
      chai.request(server)
          .post('api/v1.0/ReadMetaData')
          .send(object)          
          .end((err, res) => {           
                res.should.have.status(400);
                res.body.should.be.a('object');                                            
            done();
          });
    }),
    it('it should return Success response from api with all valid token and body', (done) => { 
      let object = { URL : 'https://www.youtube.com/watch?v=GN2nFJ9Ku6Q' };       
      chai.request(server)          
          .post('/api/v1.0/ReadMetaData')
          .set({ "Authorization": 'dGVzdH50ZXN0MTIzNA==' })      
          .send(object)    
          .end((err, res) => {           
                res.should.have.status(200);
                res.body.should.be.a('object');                              
                res.body.should.have.property('message').eql('Success');                               
            done();
          });
    }),    
    it('it should return unathorized access response from api if token is not valid', (done) => { 
      let object = { URL : 'https://www.youtube.com/watch?v=GN2nFJ9Ku6Q' };       
      chai.request(server)          
          .post('/api/v1.0/ReadMetaData')
          .set({ "Authorization": 'dGVzdH50ZXN0MTIzNDU=' })      
          .send(object)    
          .end((err, res) => {           
                res.should.have.status(401);                                                                                    
            done();
          });
    });
});