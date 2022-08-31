import React,{useState} from 'react'
import axios from 'axios'
import {Form,Button} from 'react-bootstrap'
import '../../css/signUp.css'
export default function SignUp() {
const [user,setUser]=useState({})
    async function addUser(e){
        e.preventDefault()
        let obj={
            name:user.name,
            email:user.email,
            password:user.password,
        }
        await axios.post("http://localhost:5000/api/register",obj)
    }
  return (
    <div className='formDiv'>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label className='formLabel'>User Name</Form.Label>
    <Form.Control type="text" placeholder="Enter your user name" name='name' onChange={(e)=>setUser({...user,name:e.target.value})} className='p-3 mt-2'/>    
  </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" name='email' onChange={(e)=>setUser({...user,email:e.target.value})} className='p-3 mt-2'/>    
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your Password" name='password' onChange={(e)=>setUser({...user,password:e.target.value})} className='p-3 mt-2'/>
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={(e)=>addUser(e)}>
        Register
      </Button>
      <p>You Have Account ?</p>
      <Button variant="primary" type="submit" href='/'>
        Login Now
      </Button>
    </Form>
    </div>
  )
}
