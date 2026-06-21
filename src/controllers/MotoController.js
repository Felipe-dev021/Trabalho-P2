const mongoose = require('mongoose');
const Moto = require('../models/Moto');

class MotoController {
  async index(req, res) {
    const motos = await Moto.find().sort({ createdAt: -1 });
    return res.status(200).json(motos);
  }

  async show(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid moto id.' });
    }

    const moto = await Moto.findById(req.params.id);

    if (!moto) {
      return res.status(404).json({ error: 'Moto not found.' });
    }

    return res.status(200).json(moto);
  }

  async store(req, res) {
    try {
      const moto = await Moto.create(req.body);
      return res.status(201).json(moto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid moto id.' });
      }

      const moto = await Moto.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!moto) {
        return res.status(404).json({ error: 'Moto not found.' });
      }

      return res.status(200).json(moto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid moto id.' });
    }

    const moto = await Moto.findByIdAndDelete(req.params.id);

    if (!moto) {
      return res.status(404).json({ error: 'Moto not found.' });
    }

    return res.status(204).send();
  }
}

module.exports = new MotoController();
