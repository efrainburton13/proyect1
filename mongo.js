const mongoose = require('mongoose')

const connectionString = `mongodb+srv://efrain:Panama1234@cluster0.rkedp.mongodb.net/gastos?retryWrites=true&w=majority`

//Conexion a mongodb
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(()=>{
        console.log('database connecte')
    }).catch(error => {
        console.log(error)
    })