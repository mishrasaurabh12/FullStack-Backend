import React from 'react'
import {useEffect,useState,useContext} from 'react'
import {AuthContext} from "../helpers/AuthContext"
import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function CreatePost() {
  let history =useHistory();
  const {authState}=useContext(AuthContext);
  useEffect(() => {
    if(!localStorage.getItem("accessToken")){
      history.push("/login");
    }
  }, [])
  
  const initialValues={
    title:"",
    postText:""
  }
  const onSubmit =(data,actions)=>{
    axios.post("http://localhost:3001/posts",data,{headers:{accessToken:localStorage.getItem("accessToken")}})
    .then((res)=>{
      history.push("/");
      // console.log(res);
    })
    actions.resetForm();
  }
  const validationSchema=Yup.object().shape({
    title:Yup.string().required(),
    postText:Yup.string().required()
  })
  return (
    <div className='createPostPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <label>Title:</label>
          <ErrorMessage name="title" component="span"/>
          <Field id="inputCreatePost" name="title" placeholder="(Ex. Title...)">
          </Field>
          <label>Post:</label>
          <ErrorMessage name="postText" component="span"/>
          <Field id="inputCreatePost" name="postText" placeholder="(Ex. Post...)">
          </Field>
          {/* <label>Username:</label>
          <ErrorMessage name="username" component="span"/>
          <Field id="inputCreatePost" name="username" placeholder="(Ex. John123...)">
          </Field> */}
          <button type='submit'>Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost 