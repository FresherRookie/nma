import mongoose, { Schema, Document } from 'mongoose';

export interface IInstrument extends Document {
  name: string;
  description?: string;
}

const InstrumentSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
});

const Instrument =
  mongoose.models.Instrument ||
  mongoose.model<IInstrument>('Instrument', InstrumentSchema);
export default Instrument;
