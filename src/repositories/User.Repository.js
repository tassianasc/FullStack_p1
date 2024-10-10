const mysqlConnection = require('../config/mysql');
const bcrypt = require('bcryptjs');

// Função para buscar usuário por e-mail
exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    mysqlConnection.query(query, [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]); // Retorna o primeiro usuário encontrado
      }
    });
  });
};

// Função para registrar novo usuário
exports.registerUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    mysqlConnection.query(query, [name, email, password], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId); // Retorna o ID do novo usuário
      }
    });
  });
};
