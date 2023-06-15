import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from '../config.js'

async function connect(){

    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();
    const mongoURI = 'mongodb+srv://reroar:reroar001@cluster0.h1hjtz6.mongodb.net/login?retryWrites=true&w=majority'


    mongoose.set('strictQuery', true)
    // const db = await mongoose.connect(getUri);
    const db = await mongoose.connect(mongoURI);
    console.log("Database Connected")
    return db;
}

export default connect;