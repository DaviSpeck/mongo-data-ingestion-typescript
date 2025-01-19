import mongoose, { Schema } from 'mongoose';

const iesSchema = new Schema({
  id_ies: { type: Number, unique: true, required: true },
  sigla_ies: String,
  uf_ies: String,
  estado_ies: String,
  categoria_administrativa_ies: String,
  municipio_ies: String,
  organizacao_academica_ies: String,
  nome_ies: String,
  regiao_ies: String,
  end_bairro_ies: String,
  end_numero_ies: String,
  end_logradouro_ies: String,
  data_homologacao_ies: Date,
  contato_dirigente_ies: String,
  contato_id_dirigente_ies: Number,
  contato_url_ies: String,
  end_complemento_ies: String,
  end_pais_ies: String,
  end_cep_ies: String,
  tipo_instituicao_ies: String
}, { timestamps: true });

const IES = mongoose.model('IES', iesSchema);
export default IES;