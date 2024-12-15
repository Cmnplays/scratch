require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const port = 3000;
const cookieParser=require("cookie-parser")
const db = require("./config/mongoose-connection.js")
const indexRouter=require("./backend/routes/index.js")
const ownersRouter = require("./backend/routes/ownersRouter.js")
const usersRouter = require("./backend/routes/usersRouter.js")
const productsRouter = require("./backend/routes/productsRouter.js")
const expressSession= require("express-session")
const flash=require("connect-flash")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))
app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:process.env.EXPRESS_SESSION_SECRET,
  cookie:{
    httpOnly:true
  }
}))
app.use(flash())
app.set("view engine","ejs")


app.use("/",indexRouter)
app.use("/owners",ownersRouter)
app.use("/users",usersRouter)
app.use("/products",productsRouter)


app.listen(process.env.PORT || port,()=>{
  console.log("Successfully started server at",port)
})