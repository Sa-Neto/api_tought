const mongoose = require('mongoose');

const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const conn = () => {
  try {
    const db = mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.pcijp45.mongodb.net/?retryWrites=true&w=majority`);
    // console.log('BANCO DE DADOS CONECTADO COM SUCESSO');
    return db;
  } catch (e) {
    console.log(e);
  }
};
conn();

module.exports = conn;
