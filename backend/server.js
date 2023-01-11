const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3030

const toyService = require('./services/toy.service.js')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use(express.json())

// Read - get all
app.get('/api/toy', (req, res) => {
    const filterBy = req.query
    toyService.query(filterBy)
        .then((toys) => {
            res.send(toys)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot get toys')
        })
})

app.get('/api/toy/stock', (req, res) => {
    toyService.getStockByLabels()
        .then((toys) => {
            res.send(toys)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot get toys')
        })
})

// Read - GetById
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then((toy) => {
            res.send(toy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot get toy')
        })
})

// Update
app.put('/api/toy', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot update toy')
        })
})

// Create
app.post('/api/toy', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot create toy')
        })
})

// Remove
app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.remove(toyId)
        .then(() => {
            res.send({ msg: 'Toy removed successfully', toyId })
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot delete toy')
        })
})

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))