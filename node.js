const {model, Schema} = require('mongoose')

const gastoSchema = new Schema({
    conc: String,
    dateSince: Date,
    dateUntil: Date,
    codEmp: Number,
    name: String,
    dep: String,
    pos: String,
    sup: String,
    infoEmp: Array,
    mfinal: Number
})

gastoSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Gasto = model('Gasto', gastoSchema)

module.exports = Gasto