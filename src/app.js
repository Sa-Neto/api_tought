const dotenv = require('dotenv');

dotenv.config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const conn = require('./db/conn');
const router = require('./router/router');
const swaggerDocs = require('./swagger.json');

const app = express();

app.use(express.json());
// Database
conn();
// Route
app.get('/', (req, res) => {
  res.send('Olá mundo');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', router);

module.exports = app;
