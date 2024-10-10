const UserRepository = require('../repositories/User.Repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registro de usuário
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log('Verificando se o usuário já existe...');
    let user = await UserRepository.findUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    console.log('Criptografando a senha...');
    const hashedPassword = await bcrypt.hash(password, 10); // Criptografa a senha

    console.log('Salvando o novo usuário no banco de dados...');
    const userId = await UserRepository.registerUser(name, email, hashedPassword);

    console.log('Gerando token JWT...');
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('Registro concluído com sucesso');
    res.status(201).json({ token });
  } catch (err) {
    console.error('Erro no processo de registro:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserRepository.findUserByEmail(email);
    
    if (!user) {
      console.log('Usuário não encontrado!');
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    console.log('Login bem-sucedido, retornando token.');
    res.json({ token });
  } catch (err) {
    console.error('Erro no processo de login:', err);  // Exibe o erro exato
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};