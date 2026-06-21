const jwt = require('jsonwebtoken');
const User = require('../models/User');

function sanitizeUser(user) {
  const plainUser = user.toJSON();
  delete plainUser.password;
  return plainUser;
}

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  });
}

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.unscoped().findOne({ where: { email } });

      if (existingUser) {
        return res.status(409).json({ error: 'Email is already in use.' });
      }

      const user = await User.create({ name, email, password });

      return res.status(201).json({
        user: sanitizeUser(user),
        token: generateToken(user)
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.scope('withPassword').findOne({ where: { email } });

      if (!user || !(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      return res.status(200).json({
        user: sanitizeUser(user),
        token: generateToken(user)
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req, res) {
    const users = await User.findAll({ order: [['id', 'ASC']] });
    return res.status(200).json(users);
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json(user);
  }

  async update(req, res) {
    try {
      const user = await User.unscoped().findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const { name, email, password } = req.body;

      if (email && email !== user.email) {
        const emailInUse = await User.unscoped().findOne({ where: { email } });

        if (emailInUse) {
          return res.status(409).json({ error: 'Email is already in use.' });
        }
      }

      await user.update({
        name: name ?? user.name,
        email: email ?? user.email,
        password: password ?? user.password
      });

      return res.status(200).json(sanitizeUser(user));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const user = await User.unscoped().findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    await user.destroy();

    return res.status(204).send();
  }
}

module.exports = new AuthController();
