const mongoose = require('mongoose');
const Brand = require('../models/Brand');

class BrandController {
  async index(req, res) {
    const brands = await Brand.find().sort({ createdAt: -1 });
    return res.status(200).json(brands);
  }

  async show(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid brand id.' });
    }

    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found.' });
    }

    return res.status(200).json(brand);
  }

  async store(req, res) {
    try {
      const brand = await Brand.create(req.body);
      return res.status(201).json(brand);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid brand id.' });
      }

      const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!brand) {
        return res.status(404).json({ error: 'Brand not found.' });
      }

      return res.status(200).json(brand);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid brand id.' });
    }

    const brand = await Brand.findByIdAndDelete(req.params.id);

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found.' });
    }

    return res.status(204).send();
  }
}

module.exports = new BrandController();
