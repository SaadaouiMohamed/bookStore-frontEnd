import React from 'react'
import bookLogo from '../../assets/bookLogo1.webp'
export default function Footer() {
  return (
    <div style={{backgroundColor:'grey',width:'100%',marginTop:'5%'}}>
    <img src={bookLogo} alt='book Logo' style={{width:'5%',paddingTop:'1%'}}/>
    <a href='#' style={{display:'block'}}>Contact us</a>
    </div>
  )
}
