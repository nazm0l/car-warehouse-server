const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mbq1u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
        try{
            await client.connect();
            const carCollection = client.db('carWarehouse').collection('cars');

            app.get('/cars', async(req, res) =>{
                const query = {};
                const cursor = carCollection.find(query);
                const cars = await cursor.toArray();

                res.send(cars);
            });
        }
        finally{

        }
}
run().catch(console.dir)


app.get('/', (req, res) =>{
    res.send('Running your first api')
});

app.listen(port, () =>{
    console.log('Server rumming');
})