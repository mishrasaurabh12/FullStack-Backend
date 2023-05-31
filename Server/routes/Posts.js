const express=require("express");
const router=express.Router();
const {Posts} =require("../models")
const {Likes}=require("../models")
const {validateToken}=require("../middlewares/AuthMiddleware")
router.get("/",validateToken,async(req,res)=>{
    const listOfPosts=await Posts.findAll({include:[Likes]});
    const likedPost=await Likes.findAll({where:{UserId:req.user.id}})
    res.json({listOfPosts:listOfPosts,likedPost:likedPost});
});
router.get("/ById/:id",async(req,res)=>{
    const id=req.params.id;
    const postById= await Posts.findByPk(id);
    res.json(postById);
});
router.post('/',validateToken,async (req,res)=>{
    const post=req.body;
    post.username=req.user.username;
    post.UserId=req.user.id;
    await Posts.create(post)
    res.json(post);
})
router.delete('/:postId',validateToken,async(req,res)=>{
    const postId=req.params.postId;
    Posts.destroy({where:{
        id:postId
    }})
    res.json("Success")
})
router.get("/byuserId/:id",async(req,res)=>{
    const id=req.params.id;
    const listOfPosts=await Posts.findAll({where:{UserId:id},include:[Likes]});
    res.json(listOfPosts);
})
module.exports=router