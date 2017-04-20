const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const SensorDataCollector = require('./services/sensor/sen0177/sensor-data-collector');
const sensorDataStorage = require('./services/sensor-data-storage');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = {
    info: {
        title: 'Sensor API',
        version: '1.1.0',
        description: 'This API provides PM sensor data',
    },
    basePath: '/',
};

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: swaggerDefinition,
    apis: ['./server.js'],
});

app.listen(3020, () => {
    console.log('listening on: ', 3020)
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

let sensorDataCollector = new SensorDataCollector(config.sensor);
sensorDataCollector.collect();

/**
 * @swagger
 * definitions:
 *   SensorValues:
 *     properties:
 *       pm1:
 *         type: "number"
 *       pm25:
 *         type: "number"
 *       pm10:
 *         type: "number"
 *   SensorResponse:
 *     properties:
 *       values:
 *         $ref: "#/definitions/SensorValues"
 *       time:
 *         type: "number"
 *       sensorName:
 *         type: "string"
 *       sensorModel:
 *         type: "string"
 *     example: {
 *         "values": {
 *             "pm1": 30,
 *             "pm25": 45,
 *             "pm10": 60
 *         },
 *         "time": 1485646464644,
 *         "sensorName": "XSolve HQ",
 *         "sensorModel": "SEN0177"
 *       }
 */
app
  .route('/api/sensor')
  /**
   * @swagger
   * /api/sensor:
   *   get:
   *     description: Returns last sensor data
   *     produces:
   *       - application/json
   *     responses:
   *      200:
   *        description: Sensor data object with timestamp
   *        schema:
   *          $ref: '#/definitions/SensorResponse'
   */
  .get(function(req, res) {
    res.json(sensorDataStorage.getData());
  })

module.exports = app;
