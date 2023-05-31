import React from 'react'
import { useParams,useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect ,useState} from 'react';
import axios from 'axios';
function Profile() {
    let {id}=useParams();
    let history =useHistory();
    const [username, setUsername] = useState("");
    const [listOfPost, setListOfPost] = useState([]);
    useEffect(() => {
      axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((res)=>{
        setUsername(res.data.username);
      })
      axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((res)=>{
        setListOfPost(res.data);
      })
    }, [])
    
  return (
    <div className='profilePageContainer'>
        <div className='basicInfo'></div>
        <h1>Username:{username}</h1>
        <div className='listOfPosts'>
        {listOfPost.map((value)=>{
        return (
          <div className='post' key={value.id}>
            <div className='title'>{value.title}</div>
            <div className='body' onClick={()=>{history.push(`/post/${value.id}`)}}>{value.postText}</div>
            <div className='footer'>
              <div className='username'>{value.username}</div>
              <div className='buttons'>
              {/* <ThumbUpIcon onClick={()=>{postLike(value.id)}} className={likedPosts.includes(value.id)?"unlikeBttn":"likeBttn"}/> */}
              </div>
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
        </div>
    </div>
  )
}

export default Profile