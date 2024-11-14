import mongoose, { Schema, Document, models } from 'mongoose';

export interface ContactSchema extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: Date;
}

const ContactFormSchema = new Schema<ContactSchema>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactForm =
  models.ContactForm ||
  mongoose.model<ContactSchema>('ContactForm', ContactFormSchema);

export default ContactForm;
