import React from 'react'
import Header from './Header'
import {Outlet} from 'react-router-dom'
import Footer from './Footer'
export default function Main({count}) {
  return (
    <div style={{backgroundColor:"lightgray"}}>
    <Header count={count}/>
    <Outlet></Outlet>
    <Footer/>
    </div>
  )
}
