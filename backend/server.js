
require("dotenv").config()

const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")

const tokens=require("./routes/tokens")
const admin=require("./routes/admin")

const app=express()

app.use(cors())
app.use(bodyParser.json())

app.use("/api/tokens",tokens)
app.use("/api/admin",admin)

app.use(express.static("../frontend"))

const PORT=process.env.PORT||3000

app.listen(PORT,()=>{
console.log("SpyTON Ultimate running",PORT)
})
