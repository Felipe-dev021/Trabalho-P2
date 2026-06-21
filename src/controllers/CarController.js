const mongoose = require('mongoose');
const Car = require('../models/Car');

class CarController {
  async index(req, res) {
    const cars = await Car.find().sort({ createdAt: -1 });
    return res.status(200).json(cars);
  }

  async show(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid car id.' });
    }

    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ error: 'Car not found.' });
    }

    return res.status(200).json(car);
  }

  async store(req, res) {
    try {
      const car = await Car.create(req.body);
      return res.status(201).json(car);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid car id.' });
      }

      const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!car) {
        return res.status(404).json({ error: 'Car not found.' });
      }

      return res.status(200).json(car);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid car id.' });
    }

    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({ error: 'Car not found.' });
    }

    return res.status(204).send();
  }
}

module.exports = new CarController();
