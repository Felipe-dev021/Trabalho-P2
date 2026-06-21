const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120
    },
    country: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    foundedYear: {
      type: Number,
      required: true,
      min: 1000,
      max: 2100
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

module.exports = mongoose.model('Brand', brandSchema);
