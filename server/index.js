const express = require('express')
const app = express()
const {PORT, CLIENT_URL} = require('./constants/constants')
const cors = require('cors')
const pg = require('pg')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')

// dotenv.config()

// Initialize middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

// Test routes to make sure the server is up and running

// app.get('/', (req, res) => {
//     res.send('Welcome to our home page')
// })

// app.get('/users', (req, res) => {
//     res.send('Welcome to the Users page')
// })

const corsOptions = {
    origin: CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`The server is listening on port ${PORT}`)
        })
    } catch (err) {
        console.log(`Error: ${err.message}`)
    }
}

appStart()