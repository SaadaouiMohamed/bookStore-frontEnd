import React from 'react'
import Header from './Header'
import {Outlet} from 'react-router-dom'
import Footer from './Footer'
export default function Main({count,setSearch}) {
  return (
    <div style={{backgroundColor:"lightgray"}}>
    <Header count={count} setSearch={setSearch}/>
    <Outlet></Outlet>
    <Footer/>
    </div>
  )
}
