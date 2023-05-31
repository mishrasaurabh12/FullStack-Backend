import React,{useContext, useState} from 'react'
import axios from "axios"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import {AuthContext} from "../helpers/AuthContext"
function Login() {
  const {setAuthState}=useContext(AuthContext);
  let history=useHistory();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const submit=()=>{
    const obj={
      username:username,
      password:password
    }
    axios.post("http://localhost:3001/auth/login",obj)
    .then((res)=>{
      if(res.data.error){
        alert(res.data.error)
      }
      else{
        localStorage.setItem("accessToken",res.data.token);
        setAuthState({username:res.data.username,id:res.data.id,status:true});
        history.push("/")
      }
    })
    setPassword("");
    setUsername("");
  }
  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        value={username}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        value={password}
      />
      <button onClick={submit}> Login </button>
    </div>
  )
}

export default Login