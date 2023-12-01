const express = require('express');
const app = express();
const db = require('./db');
db();

const PORT = process.env.PORT || 4000

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('', require('./routes/Createuser'));
app.use('', require('./routes/DisplayData'));
app.use('', require('./routes/OrderData'));
app.use('', require('./routes/OTP'))

app.listen(PORT, () => {
    console.log("Connected at port no. 4000");
})