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

                    res.body.should.be.an('object');
                    expect(res.body).to.have.property('values');
                    expect(res.body).to.have.property('time');
                    expect(res.body).to.have.property('sensorName');
                    expect(res.body).to.have.property('sensorModel');
                    expect(res.body.values).to.have.property('pm1');
                    expect(res.body.values).to.have.property('pm10');
                    expect(res.body.values).to.have.property('pm25');

                    done();
                });
          }, 2000);
        });
    });
});
