const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Contacts API'
    },
    host: 'localhost:3001',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // Path to the API routes

swaggerAutogen(outputFile, endpointsFiles, doc);
