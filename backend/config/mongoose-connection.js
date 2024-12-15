const mongoose = require("mongoose")
const config = require("config")

mongoose
.connect(`${config.get("MONGODB_URI")}/scratch`)
.then(()=>{
  console.log("Successfully connected to mongodb server")
})
.catch((err)=>{
  console.log(err)
})

module.exports = mongoose.connection;