const express=require('express');
const app=express();
const cors=require("cors");
app.use(express.json());
app.use(cors());
const db=require("./models");
const postRouter=require("./routes/Posts");
const commentRouter=require("./routes/Comments");
const userRouter=require("./routes/Users");
const likeRouter=require("./routes/Likes");
app.use("/posts",postRouter);
app.use("/comments",commentRouter);
app.use("/auth",userRouter);
app.use("/like",likeRouter);
db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("Server running");
    });
})
