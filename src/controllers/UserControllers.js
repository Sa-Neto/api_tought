const bcrypt = require('bcrypt');
const User = require('../models/User');
const createUserToken = require('../helpers/create-Token');

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Atributo nome é obrigatorio' });
    }
    if (!email) {
      return res.status(400).json({ error: 'Atributo email é obrigatorio' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Atributo senha é obrigatorio' });
    }
    try {
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(401).json({ error: 'email já cadastrado' });
      }
      const salt = await bcrypt.genSalt(8);
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = new User({ name, email, password: passwordHash });
      newUser.save();
      createUserToken(newUser, req, res);
    } catch (e) {
      console.log(e);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(403).json({ error: 'Email é um item obrigatório' });
    }
    if (!password) {
      return res.status(403).json({ error: 'Senha é um item obrigatório' });
    }
    try {
      const user = await User.findOne({ email });
      await bcrypt.compare(user.password, password);
      createUserToken(user, req, res);
    } catch (e) {
      console.log(e);
    }
  }
};
