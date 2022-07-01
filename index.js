const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2mqan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        const dailyActivities = client.db('to-do-list').collection('daily-activities')

        app.post('/tasks', async(req,res) => {
            const task = req.body;
            const result = await dailyActivities.insertOne(task);
            res.send(result);
        })

        app.get('/tasks', async(req,res) => {
            const result = await dailyActivities.find().toArray();
            res.send(result);
        })
    }
    finally{

    }
}

run().catch(console.dir);


app.get('/', (req,res) => {
    res.send('car server is running')
})

app.listen(port , () => {
    console.log('listening to port ', port)
})