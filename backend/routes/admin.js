
const express=require("express")
const router=express.Router()
const db=require("../database")

router.get("/pending",(req,res)=>{

if(req.headers.authorization!==process.env.ADMIN_TOKEN)
return res.status(403).json({error:"unauthorized"})

db.all("SELECT * FROM tokens WHERE status='pending'",[],(e,r)=>{

res.json(r)

})

})

router.post("/approve",(req,res)=>{

if(req.headers.authorization!==process.env.ADMIN_TOKEN)
return res.status(403).json({error:"unauthorized"})

const {id}=req.body

db.run("UPDATE tokens SET status='approved' WHERE id=?",[id],err=>{

res.json({success:true})

})

})

module.exports=router
