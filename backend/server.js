const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser =  require('cookie-parser')
const helmet = require('helmet')

const authRoute = require('./routes/authRoute')
const { requireAuth } = require('./middleware/authMiddleware')

const app = express()
dotenv.config();

app.use(cookieParser())
app.use(cors({origin: 'http://127.0.0.1:5500', credentials: true}))
app.use(express.json())


app.get('/', (req, res) => {
    let origin = req.get('origin');
    let host = req.get('host');
    res.send(`connected to server.js. Origin: ${origin}, Host: ${host}`)
})
// restricted route. requires jwt authentication.
app.get('/restricted', requireAuth, (req, res) => {
    let content = 'You are logged in. You have been successfuly authenticated and granted access to a restricted route.'
    res.status(202).json(content)   //sent if authentication is successful
})

// route
app.use('/auth', authRoute)

// DB connection
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.xp6ui.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {console.log('database connected')})
    .catch(err => {console.log(err)});



app.listen(3000, () => {
console.log(`app listening on port ${3000}`)
})