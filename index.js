const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mbq1u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
        try{
            await client.connect();
            const carCollection = client.db('carWarehouse').collection('cars');
            
            // jwt 
            // app.get('/token', async(req, res)=>{
            //     const user = req.body;
            //     const token = jwt.sign(user, process.env.SECRET_TOKEN,{expiresIn:'5d'})
            //     res.send(token);
            // })


            // total car
            app.get('/cars', async(req, res) =>{
                const query = {};
                const cursor = carCollection.find(query);
                const cars = await cursor.toArray();

                res.send(cars);
            });
            // user based car
            app.get('/user', async(req, res) =>{
                const email = req.query.email
                const query = {email};
                const cursor = carCollection.find(query);
                const cars = await cursor.toArray();

                res.send(cars);
            });

            // single car
            app.get('/cars/:id', async(req, res) =>{
                const id = req.params.id;
                const query = {_id: ObjectId(id)};
                const cars = await carCollection.findOne(query);
                res.send(cars);
              });

            //   add car 
              app.post('/cars', async(req, res) =>{
                const newCar = req.body;
                const result = await carCollection.insertOne(newCar);
                res.send(result);
              });

            //   update quantity
            app.put('/cars/:id', async(req, res) =>{
                const id = req.params.id;
                const query = {_id: ObjectId(id)};
                const newQuantity = req.body
                const options = {upsert: true}
                const updateDoc ={
                    $set: {
                            quantity: newQuantity.quantity
                    }
                }
                const result = await carCollection.updateOne(query, updateDoc, options);
                res.send(result);
            })

            // delete car 
            app.delete('/cars/:id', async(req, res) => {
                const id = req.params.id;
                const query = {_id: ObjectId(id)};
                const result = await carCollection.deleteOne(query);
                res.send(result);
            })
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