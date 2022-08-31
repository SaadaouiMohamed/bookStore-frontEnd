import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios'
import '../../css/SignIn.css'
export default function SignIn() {
const [user,setUser]=useState({})

async function login(e){
    e.preventDefault()
    let obj={
        email:user.email,
        password:user.password
    }
    await axios.post("http://localhost:5000/api/login",obj)
    .then((res)=>{
        let userToken="Bearer "+res.data.token
        localStorage.setItem("token", JSON.stringify({ token: userToken }))
    })
    window.location.href='/home'
}

  return (
    <div className='formDiv'>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='mt-3'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e) => setUser({ ...user, email: e.target.value })} className='p-3 mt-2'/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label controlId='labelpass'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' onChange={(e) => setUser({ ...user, password: e.target.value })} className='p-3 mt-2'/>
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={(e)=>login(e)}>
        Login
      </Button>
      <p>New Customer ?</p>
      <Button variant="primary" type="submit" href='/register'>
        Rgister Now
      </Button>
    </Form>
    </div>
  )
}
