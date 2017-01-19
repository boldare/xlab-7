let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-things'));

describe('Sensor', () => {
    describe('GET /api/sensor', () => {
        it('it should GET empty sensor data', (done) => {
            chai.request(server)
                .get('/api/sensor/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('it should GET sensor data initialized after some time', (done) => {
          setTimeout(function(){
            chai.request(server)
                .get('/api/sensor/')
                .end((err, res) => {
                    res.should.have.status(200);

                    res.body.should.be.a('array');
                    expect(res.body[0]).to.have.any.keys('status', 'indicator', 'value', 'unit');
                    expect(res.body[0].indicator).to.be.equals('PM1.0');
                    expect(res.body[0].unit).to.be.equals('ug/m3');
                    expect(res.body[0].status).to.be.equals('ok');
                    expect(res.body[0].value).to.be.a('number');

                    done();
                });
          }, 8000);
        });
    });
});
