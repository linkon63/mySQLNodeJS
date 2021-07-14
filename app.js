const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodeParser = require('body-parser');
const PORT = process.env.PORT || 8080 ;
dotenv.config();

const dbService = require('./dbService');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(bodeParser.json());

// create

app.get('/getAll',(req,res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
    .then(data => res.json({data: data}))
    .catch(err => console.log('errorGetAll ',err))
})

//insert

app.post('/insert', (request, response) => {
    const data = request.body;
    const db = dbService.getDbServiceInstance();
    // console.log('DATA INSERT ',data);
    // db.insertNewUser(data)
    const result = db.insertNewUser(data);
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log('insert ONE ',err));
});



app.listen(PORT, () => console.log('app is running PORT : ', PORT));