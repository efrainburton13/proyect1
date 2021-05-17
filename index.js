require('./mongo.js')
const express = require('express')
const cors = require('cors')

const app = express()

const Gasto = require('./node.js')
const handleErrors = require('./handleErrors.js')
const notFound = require('./notFound.js')

app.use(cors())
app.use(express.json())

app.get('/gastos', (request, response)=>{
    Gasto.find({}).then(g =>{
        response.json(g)
    })
})

app.get('/gastos/:id', (request, response, next)=>{
    const id = request.params.id
    Gasto.findById(id).then(g => {
        if(g) return response.json(g)
        response.status(404).end()
    }).catch(err => next(err))
})

app.delete('/gastos/:id', (request, response)=>{
    const {id} = request.params
    Gasto.findByIdAndDelete(id).then(()=>{
        response.status(204).end()
    }).catch(error => next(error))
})

app.put('/gastos/:id', (request, response)=>{
    const {id} = request.params
    const body = request.body
    const newGastoUpdate = {
        name: body.name
    }
    Gasto.findByIdAndUpdate(id, newGastoUpdate, {new: true})
        .then(g =>{
            response.json(g)
        }).catch(error => next(error))
})

app.post('/gastos', (request, response)=>{
    const body = request.body

    const newGasto = new Gasto({
        conc: body.conc,
        dateSince: new Date(),
        dateUntil: new Date(),
        codEmp: body.codEmp,
        name: body.name,
        dep: body.dep,
        pos: body.pos,
        sup: body.sup,
        infoEmp: body.infoEmp,
        mfinal: body.mfinal
    })
    newGasto.save().then(savedGasto =>{
        response.json(savedGasto)
    })
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
})