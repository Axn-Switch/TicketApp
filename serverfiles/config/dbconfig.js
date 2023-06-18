const mongoose = require('mongoose')

const connectToDb = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_PATH)
        console.log(`MONGO DB connected : ${conn.connection.host}`)
    }catch(err){
        console.log(`Error : ${err.mressage}`)
        process.exit(1)
    }
}
module.exports = connectToDb