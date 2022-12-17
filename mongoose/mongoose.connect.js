import mongoose from "mongoose";

import dotenv from 'dotenv'
dotenv.config()

const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.naikq78.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);


try {
mongoose.connect( URL, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
console.log(`MONGO DB connected`));    
}catch (error) { 
console.log("could not connect to DB");    
}