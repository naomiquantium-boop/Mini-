
const express=require("express")
const router=express.Router()
const db=require("../database")
const {v4:uuid}=require("uuid")

router.get("/leaderboard",(req,res)=>{

db.all(`SELECT * FROM tokens WHERE status='approved'
ORDER BY boost DESC, votes DESC`,[],(e,r)=>{

if(e) return res.status(500).json(e)

res.json(r)

})

})

router.post("/submit",(req,res)=>{

const {name,symbol,contract,website,telegram,twitter,logo}=req.body

db.run(
`INSERT INTO tokens(name,symbol,contract,website,telegram,twitter,logo,status)
VALUES(?,?,?,?,?,?,?,'pending')`,
[name,symbol,contract,website,telegram,twitter,logo],
function(err){

if(err) return res.status(500).json(err)

res.json({
success:true,
token_id:this.lastID
})

})

})

router.post("/vote/:id",(req,res)=>{

const voter=req.ip
const token=req.params.id

db.get("SELECT * FROM votes WHERE token_id=? AND voter=?",[token,voter],(e,row)=>{

if(row){
return res.json({error:"Already voted"})
}

db.run("INSERT INTO votes(token_id,voter) VALUES(?,?)",[token,voter])

db.run("UPDATE tokens SET votes=votes+1 WHERE id=?",[token])

res.json({success:true})

})

})

router.post("/boost/:id",(req,res)=>{

db.run("UPDATE tokens SET boost=boost+1 WHERE id=?",[req.params.id],err=>{

if(err) return res.status(500).json(err)

res.json({success:true})

})

})

module.exports=router
