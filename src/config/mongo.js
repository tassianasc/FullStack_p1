const mongoose = require('mongoose');

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vmdhi.mongodb.net/P1_FullStack?retryWrites=true&w=majority&appName=Cluster0`, 
      {
        serverSelectionTimeoutMS: 5000, // Mantém o timeout
      }
    );
    console.log('Conectado ao MongoDB!');
  } catch (error) {
    console.error('Erro de conexão no MongoDB:', error);
    process.exit(1); // Sai da aplicação em caso de erro
  }
};

module.exports = mongoConnect;
