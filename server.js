const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoDB = require('./config/conn')
const cors = require('cors')


dotenv.config()

mongoDB()


// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World")
});







const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});