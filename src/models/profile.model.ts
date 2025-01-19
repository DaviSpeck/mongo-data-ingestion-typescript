import mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema({
  ano_base: { type: Number, required: true },
  nome_pessoa: { type: String, required: true },
  tipo_vinculo: { type: String, required: true },
  id_ies: { type: Schema.Types.ObjectId, ref: 'IES', required: true },
  id_programa: { type: Schema.Types.ObjectId, ref: 'PPG', required: true }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;