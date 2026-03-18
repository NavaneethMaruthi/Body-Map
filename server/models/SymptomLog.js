const mongoose = require('mongoose');

const SymptomLogSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bodyRegion: { type: String, required: true },
  coords3D:   {
    x: Number,
    y: Number,
    z: Number
  },
  severity:   { type: Number, min: 1, max: 10, required: true },
  category:   { type: String, enum: ['muscle', 'joint', 'skin', 'nerve', 'other'] },
  notes:      { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('SymptomLog', SymptomLogSchema);
