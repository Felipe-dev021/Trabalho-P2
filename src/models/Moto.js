const mongoose = require('mongoose');

const motoSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    model: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100
    },
    year: {
      type: Number,
      required: true,
      min: 1885,
      max: 2100
    },
    color: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('Moto', motoSchema);
