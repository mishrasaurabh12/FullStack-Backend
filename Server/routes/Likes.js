const express=require("express");
const router=express.Router();
const {Likes} =require("../models")
const {validateToken} = require("../middlewares/AuthMiddleware")
router.post("/",validateToken,async(req,res)=>{
    const {PostId}=req.body;
    const UserId=req.user.id;
    const found= await Likes.findOne({where:{PostId:PostId,UserId:UserId}});
    if(!found){
        // console.log(UserId);
        await Likes.create({
            PostId:PostId,
            UserId:UserId
        })
        res.json({liked:"likes the post"})
    } 
    else{
        await Likes.destroy({where:{
            UserId:UserId,
            PostId:PostId
        }})
        res.json({unliked:"Unliked the post"})
    }

})
module.exports=router