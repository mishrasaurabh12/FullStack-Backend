import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import {useParams,useHistory} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext"
function Post() {
  let history=useHistory();
  const {authState}=useContext(AuthContext);
    const [postById, setPostById] = useState({});
    const [comment, setComment] = useState([])
    const [newComment, setNewComment] = useState("")
    let {id}=useParams();
    const addComment=()=>{
      const obj={
        commentBody:newComment,
        PostId:id
      }
      axios.post("http://localhost:3001/comments",obj,{
        headers:{
          accessToken:localStorage.getItem("accessToken")
        }
      })
      .then((res)=>{
        if(res.data.error){
          alert(res.data.error);
          setNewComment("");
        }
        else{
          obj.username=res.data.username;
          console.log(obj);
          setNewComment("");
          setComment([...comment,obj]);
        }
      })
    }
    useEffect(() => {
      axios.get(`http://localhost:3001/posts/ById/${id}`)
      .then((res)=>{
        setPostById(res.data);
      })
      axios.get(`http://localhost:3001/comments/${id}`)
      .then((res)=>{
        console.log("e");
        setComment(res.data);
      })
    }, [])
    const destroy=(id)=>{
      axios.delete(`http://localhost:3001/comments/${id}`,{headers:{
        accessToken:localStorage.getItem("accessToken")
      }}
      )
      .then((res)=>{
        setComment(comment.filter((val)=>{
          return val.id!=id
        }))
      })
    }
    const deletePost=(id)=>{
      axios.delete(`http://localhost:3001/posts/${id}`,{headers:{accessToken:localStorage.getItem('accessToken')}}).then(()=>{
        // alert('Deleted');
        history.push('/');
      })

    }
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postById.title} </div>
          <div className="body">{postById.postText}</div>
          <div className="footer">{postById.username} {authState.username===postById.username&&<button onClick={()=>{deletePost(postById.id)}}>Delete</button>}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className='addCommentContainer'>
          <input type="text" placeholder='Comment...' autoComplete='off' value={newComment} onChange={(e)=>{setNewComment(e.target.value)}}/>
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className='listOfComments'>
          {comment.map((comm,key)=>{
            return <div key={key} className='comment'>{comm.commentBody}
            <label> Username: {comm.username}</label>
            {authState.username==comm.username&& <button onClick={()=>{destroy(comm.id)}}>X</button>}
           </div>
          })}
        </div>
      </div>
    </div>
  )
}
export default Post