const request = require('supertest')
const expect = require('chai').expect
const baseUrl = 'http://localhost:4000/'

describe('Restful Admin Api tests', () => {
    it('check signup', (done) => {
        request(baseUrl)
        .post('signup')
        .send({
            "name":"Rahul",
            "email":"rahul@gmail.com",
            "userName": "newUser",
            "password": "newPassword",
            // Other required signup fields
        })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end( function (err, res ){
            expect(res.statusCode).to.be.equal(200)
            if(err){
                throw err;
            }
            done();
        });
    });
    before('check status of login', (done) => {
        request(baseUrl)
        .post('login')
        .send({
            "userName" : "mohitjawa",
            "password" : "1234"
        })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end( function (err, res ){
            expect(res.status).to.be.equal(200)
            expect(res.body.token).not.to.be.null
            token = res.body.token
            if(err){
                throw err;
            }
            done();
        });
        
    });
    it('check get post list', (done) => {
        request(baseUrl)
        .get('post-list')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end( function (err, res ){
            expect(res.statusCode).to.be.equal(200)
            if(err){
                throw err;
            }
            done();
        });
    });
});

