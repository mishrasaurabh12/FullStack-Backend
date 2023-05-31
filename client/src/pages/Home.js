import React from 'react'
import axios from 'axios';
import {useEffect,useState,useContext} from 'react'
import {AuthContext} from "../helpers/AuthContext"
import {useHistory,Link} from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
function Home() {
  const {authState}=useContext(AuthContext);
  let history=useHistory();
  const [listOfPost, setListOfPost] = useState([])
  const [likedPosts, setLikedPosts] = useState([])
  useEffect(() => {
    if(!localStorage.getItem("accessToken")){
      history.push("/login");
    }
    else{
      axios.get("http://localhost:3001/posts",{headers:{
      accessToken:localStorage.getItem("accessToken")
    }})
    .then((res)=>{
      setListOfPost(res.data.listOfPosts);
      setLikedPosts(res.data.likedPost.map((like)=>{
        return like.PostId;
      }))
    })
    }
  }, [])
  const postLike =(postId)=>{
    axios.post("http://localhost:3001/like",{PostId:postId},{headers:{
      accessToken:localStorage.getItem("accessToken")
    }}).then((res)=>{
      setListOfPost(listOfPost.map((post)=>{
        if(post.id==postId){
          if(res.data.liked){
            return {...post,Likes:[...post.Likes,0]};
          }
          else{
            const likesArray=post.Likes;
            likesArray.pop();
            return {...post,Likes:likesArray};
          }
        }
        else{
          return post;
        }
      }))
      if(likedPosts.includes(postId)){
        setLikedPosts(likedPosts.filter((id)=>{
          return id!=postId;
        }))
      }
      else{
        setLikedPosts([...likedPosts,postId]);
      }
    })
  }
  return (
    <div>
        {listOfPost.map((value)=>{
        return (
          <div className='post' key={value.id}>
            <div className='title'>{value.title}</div>
            <div className='body' onClick={()=>{history.push(`/post/${value.id}`)}}>{value.postText}</div>
            <div className='footer'>
              <div className='username'><Link to={`/profile/${value.UserId}`}>{value.username}</Link></div>
              <div className='buttons'>
              <ThumbUpIcon onClick={()=>{postLike(value.id)}} className={likedPosts.includes(value.id)?"unlikeBttn":"likeBttn"}/>
              {/* <ThumbUpIcon onClick={()=>{postLike(value.id)}} className='unlikeBttn'/> */}
              </div>
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home