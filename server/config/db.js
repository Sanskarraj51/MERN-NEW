const mongoose = require("mongoose")


const MongoUrl = "mongodb+srv://sanskarr:1234wethesingh@rooms.ppih7.mongodb.net/?retryWrites=true&w=majority"


const InitiateMongoServer = async ()=>{
    try{
        await mongoose.connect(MongoUrl,{
            useNewUrlParser:true
        });
        console.log("connected to db")
    }
    catch(e){
        console.log(e)
        throw e
    }
}

module.exports = InitiateMongoServer