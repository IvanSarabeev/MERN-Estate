import mongoose from 'mongoose';
import { IContact } from 'types/model/contact';

interface ContactModel extends IContact {
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new mongoose.Schema<ContactModel>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  text_message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Contact = mongoose.model<ContactModel>('Contact', contactSchema);

export default Contact;
