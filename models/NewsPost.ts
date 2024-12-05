import mongoose, { Schema, Document, models, ObjectId } from 'mongoose';

export interface INewsPostSchema extends Document {
  title: string;
  content: string;
  userId: ObjectId;
  createdDate: Date;
  imgUrl: string;
}

const NewsPostMongooseSchema = new Schema<INewsPostSchema>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdDate: { type: Date, default: Date.now },
  imgUrl: { type: String, required: true },
});

const NewsPostForm =
  models.NewsPostForm ||
  mongoose.model<INewsPostSchema>('NewsPostForm', NewsPostMongooseSchema);

export default NewsPostForm;
