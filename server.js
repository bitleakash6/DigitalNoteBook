const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());         //req.body
const PORT = process.env.PORT || 3000;


// //import the router files
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

// //use the routers
app.use('/api/auth', authRoutes);
 app.use('/api', noteRoutes);
g

app.listen(PORT, () => {
    console.log('listening on 3000')
})
