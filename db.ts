import mongoose from 'mongoose';

export const connect = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error('MONGO_URL is not defined in environment variables');
    }
    await mongoose.connect(mongoUrl);
    console.log('Connected to Mongoose DB 🚀🚀🚀 ');
  } catch (error: any) {
    console.error('Error while connecting to MongoDB1:', error);
    throw new Error('error connection55 => ', error.message);
  }
};
