function helloWorld(req, res) {
    res.json({
        cities: [
            {
                name: 'Gliwice',
                values: [
                    {
                        date: 1484068174000,
                        pm25: 200,
                        pm10: 400,
                        pm_unit: 'μm/m³',
                        temp: -15,
                        temp_unit: '°C',
                        pressure: 1020,
                        pressure_unit: 'hPa'
                    },
                    {
                        date: 1484154574000,
                        pm25: 250,
                        pm10: 400,
                        pm_unit: 'μm/m³',
                        temp: -15,
                        temp_unit: '°C',
                        pressure: 1020,
                        pressure_unit: 'hPa'
                    },
                    {
                        date: 1484240974000,
                        pm25: 300,
                        pm10: 400,
                        pm_unit: 'μm/m³',
                        temp: -15,
                        temp_unit: '°C',
                        pressure: 1020,
                        pressure_unit: 'hPa'
                    },
                    {
                        date: 1484327374000,
                        pm25: 350,
                        pm10: 400,
                        pm_unit: 'μm/m³',
                        temp: -15,
                        temp_unit: '°C',
                        pressure: 1020,
                        pressure_unit: 'hPa'
                    }
                ]
            },
            {
                name: 'Kraków',
                values: [
                    {
                        date: 1484068174000,
                        pm25: 400,
                        pm10: 500,
                        pm_unit: 'μm/m³',
                        temp: -20,
                        temp_unit: '°C',
                        pressure: 1010,
                        pressure_unit: 'hPa'
                    },
                    {
                        date: 1484154574000,
                        pm25: 350,
                        pm10: 500,
                        pm_unit: 'μm/m³',
                        temp: -20,
                        temp_unit: '°C',
                        pressure: 1010,
                        pressure_unit: 'hPa'
                    },
                    {
                        date: 1484240974000,
                        pm25: 300,
                        pm10: 500,
                        pm_unit: 'μm/m³',
                        temp: -20,
                        temp_unit: '°C',
                        pressure: 1010,
                        pressure_unit: 'hPa'
                    },
                    {
                        date: 1484327374000,
                        pm25: 250,
                        pm10: 500,
                        pm_unit: 'μm/m³',
                        temp: -20,
                        temp_unit: '°C',
                        pressure: 1010,
                        pressure_unit: 'hPa'
                    }
                ]
            },
            {
                name: 'Pekin',
                values: [
                    {
                        date: 1484068174000,
                        pm25: 100,
                        pm10: 200,
                        pm_unit: 'μm/m³',
                        temp: -10,
                        temp_unit: '°C',
                        pressure: 1000,
                        pressure_unit: 'hPa'
                    },
                    {
                        date: 1484154574000,
                        pm25: 100,
                        pm10: 200,
                        pm_unit: 'μm/m³',
                        temp: -10,
                        temp_unit: '°C',
                        pressure: 1000,
                        pressure_unit: 'hPa'
                    },
                    {
                        date: 1484240974000,
                        pm25: 100,
                        pm10: 200,
                        pm_unit: 'μm/m³',
                        temp: -10,
                        temp_unit: '°C',
                        pressure: 1000,
                        pressure_unit: 'hPa'
                    },
                    {
                        date: 1484327374000,
                        pm25: 100,
                        pm10: 200,
                        pm_unit: 'μm/m³',
                        temp: -10,
                        temp_unit: '°C',
                        pressure: 1000,
                        pressure_unit: 'hPa'
                    }
                ]
            }
        ]
    });
}

module.exports = module.exports = {helloWorld};
