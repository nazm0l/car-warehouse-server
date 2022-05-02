const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Running your first api')
});

app.listen(port, () =>{
    console.log('Server rumming');
})