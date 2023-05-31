import './App.css';
import { BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import {AuthContext} from "./helpers/AuthContext"
import { useState,useEffect } from 'react';
import axios from 'axios';
import { buttonBaseClasses } from '@mui/material';
import PageNotFound from './pages/PageNotFound';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function App() {
  const [authState, setAuthState] = useState({username:"",id:0,status:false});
  let history=useHistory();
  const logout=()=>{
    localStorage.removeItem("accessToken");
    // history.push("/login");
    setAuthState({username:"",id:0,status:false});
    // history.push("/login");
  }
  useEffect(() => {
      axios.get("http://localhost:3001/auth/auth",{headers:{
        accessToken:localStorage.getItem("accessToken"),
      }}).then((res)=>{
        if(res.data.error){
          setAuthState({username:"",id:0,status:false});
        }
        else{
          setAuthState({username:res.data.username,id:res.data.id,status:true});
        }
      })
    
   
  }, [])
  
  return (
    <div className="App">
      <AuthContext.Provider value={{authState,setAuthState}}>
       <Router>
          <div className='navbar'>
          <div className='links'>
            {(!authState.status)?(
              <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
              </>
            ):(
              <>
                 <Link to="/createpost">Create A Post</Link>
            <Link to="/">Home Page</Link>
              </>
            )}
          </div>
          <div className='loggedInContainer'>
              <h1>{authState.username}</h1>
              {authState.status&& <button onClick={logout}>Logout</button>}
          </div>
          </div>
          <Switch>
          <Route exact path="/"><Home/> </Route>
          <Route exact path="/createpost"><CreatePost/></Route>
          <Route exact path="/post/:id"><Post/></Route>
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/register"><Register/></Route>
          <Route exact path="/profile/:id"><Profile/></Route>
          <Route exact path="*"><PageNotFound/></Route>
          </Switch>
        </Router>
        </AuthContext.Provider>
    </div>
  );
}

export default App;
