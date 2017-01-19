const sensorDataCollector = require('./services/sensor-data-collector');
const responseDataStorage = require('./services/response-data-storage');
const express = require('express');
const bodyParser = require('body-parser');

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
        version: '1.0.0',
        description: 'This is api for sensor application.',
    },
    host: 'localhost:3020',
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

sensorDataCollector.collect();

/**
 * @swagger
 * definition:
 *   SensorResponse:
 *     example: {
 *         "status": "ok, error",
 *         "indicator": "PM1 0, PM1.0, PM2.5",
 *         "value": "integer",
 *         "unit": "ug/m3",
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
   *        description: An array of sensor data + date of meassurements
   *        schema:
   *          type: array
   *          items:
   *            $ref: '#/definitions/SensorResponse'
   */
  .get(function(req, res) {
    res.json(responseDataStorage.getData());
  })

module.exports = app;
