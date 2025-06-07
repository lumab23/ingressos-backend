import mongoose, { Schema, Document } from 'mongoose';

export interface IIngresso extends Document {
  sessaoId: string;
  filmeId: string;
  filmeTitulo: string;
  dataHoraSessao: Date;
  sala: string;
  preco: number;
}

const IngressoSchema: Schema = new Schema({
  sessaoId: { type: String, required: true, index: true },
  filmeId: { type: String, required: true },
  filmeTitulo: { type: String, required: true },
  dataHoraSessao: { type: Date, required: true },
  sala: { type: String, required: true },
  preco: { type: Number, required: true },
}, { 
  timestamps: true 
});

export default mongoose.model<IIngresso>('Ingresso', IngressoSchema);