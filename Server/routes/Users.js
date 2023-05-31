const express=require("express");
const router=express.Router();
const bcrypt =require("bcrypt")
const {Users} =require("../models")
const {sign} = require("jsonwebtoken")
const {validateToken} =require("../middlewares/AuthMiddleware")
router.post('/',async (req,res)=>{
    const {username,password}=req.body;
    bcrypt.hash(password,10).then((hash)=>{
         Users.create({username:username,
            password:hash
        })
        res.json("SUCCESS");
    })
})
router.post("/login",async (req,res)=>{
    const{username, password} = req.body;
    const user=await Users.findOne({ where : {username : username }});
    if (user)
    bcrypt.compare(password, user.password).then((match) => {
      if (!match){
        res.json({ error: 'Wrong Username and Password combination' });
      }
      else {
        const accessToken=sign({username:user.username,id:user.id},"momislove")
        res.json({token:accessToken,username:username,id:user.id});
      }
    });
    else{
        res.json({ error: "User dosen't exist"})
    }
})
router.get("/auth",validateToken,async(req,res)=>{
  res.json(req.user);
})
router.get("/basicinfo/:id",async(req,res)=>{
  let id=req.params.id;
  const basicinfo=await Users.findByPk(id,{attributes:{exclude:['password']}});
  res.json(basicinfo);
})
module.exports=router;