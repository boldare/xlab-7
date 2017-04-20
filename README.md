XLAB
=========

## Services

This app is consists of 3 services:

 * _Sensor_ - communicates with sensor via serial port and provides an API to retrieve latest value
 * _API_ - fetches data from the _Sensor_ or external service and posts it to remote database
 * _SPA_ - presents the data in a fancy way

## Prerequisites

Before running this project, you will need to configure the app.

### Create a Firebase project

To run this app you will need a Firebase Project. You can create on [here](https://console.firebase.google.com/) for free.

Obtain your Firebase Admin SDK private key in project settings and put it in `api/config/xlab-smog.json`.

### Obtain WAQI API token

You will also need a [World Air Quality Index API token](http://aqicn.org/data-platform/token/).

### Fill the parameters

Then just fill your parameters in:

 * `api/config/default.js`
 * `sensor/config/config.js`
 * `spa/src/scripts/config/firebase-config.js`

## Running the app using Docker

The simpliest way to run this app is to use Docker together with Docker-Compose.
Assuming you already have it installed, create an `.env` file:
```bash
cp .env.dist .env
```

and edit the variables to suit your needs making sure `SENSOR_SERIAL_PORT` is pointing to the serial port with sensor.

### Raspberry Pi

You can easily run this project on Raspberry Pi making it fully featured mini smog monitor. However, there are some extra steps:

Uncomment the `DOCKERFILE_SUFFIX=RPi` line in `.env` file. It will tell Docker-Compose to use the `DockerfileRPi` file designed for this platform.

Run `docker-compose up` and wait for its completion. Note that building `sensor` and `spa` will take a lot of time because of compilation of `node-sass` and `node-serialport`.

## Running the app locally

If you don't want to use Docker, you will need to install node 6. If you are using an unsupported platform, you will need to compile `node-serialport` so make sure you have `build-essential` package installed.

Just run:
```bash
npm install && npm start
```

in `api`, `spa` and `sensor`.
