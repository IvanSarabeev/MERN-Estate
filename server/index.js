import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();

const PORT = process.env.PORT_KEY;
const DB_URL = process.env.MONGODB_KEY;

// mongoose.connect("");

const client = new MongoClient(DB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ping: 1});
        console.log("Pinged your deployment. You have successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

app.listen(PORT, () => {
    console.log("Server is running up");
}).on("error", (error) => {
    throw new Error(error.message);
});