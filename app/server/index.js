const express = require('express')
const cors = require('cors')

const db = require('./db')
const reviewerRouter = require('./routes/reviewers-router')

const app = express()
const apiPort = 4000

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

db.on('error', console.error.bind(console, 'Error de conexion con MongoDB:'))

app.get('/', (req, res) => {
    res.send('Hola, el servidor está funcionando correctamente')
})

app.use('/api', reviewerRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))