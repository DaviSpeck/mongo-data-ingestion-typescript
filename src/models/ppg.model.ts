import mongoose, { Schema } from 'mongoose';

const ppgSchema = new Schema({
  id_programa: { type: Number, unique: true, required: true },
  nome_programa: String,
  codigo_programa: String,
  situacao_programa: String,
  id_area_conhecimento_programa: Number,
  nome_grande_area_conhecimento_programa: String,
  id_area_avaliacao_programa: Number,
  nome_area_avaliacao_programa: String,
  id_modalidade_programa: Number,
  modalidade_programa: String,
  id_modalidade_ensino_programa: Number,
  nome_modalidade_ensino_programa: String,
  id_grande_area_conhecimento_programa: Number,
  nome_area_conhecimento_programa: String,
  grau_programa: String,
  programa_em_rede_programa: { type: Boolean, default: false },
  conceito_programa: Number
}, { timestamps: true });

const PPG = mongoose.model('PPG', ppgSchema);
export default PPG;