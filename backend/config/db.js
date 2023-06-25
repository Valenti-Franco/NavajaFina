import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const connection = await mongoose.connect("mongodb+srv://valentifranco:pOI6TEl1Bxhmqln8@cluster0.wqsoj0s.mongodb.net/barberShop?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB Conectado en: ${url} `);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

export default conectarDB;
