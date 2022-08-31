import React from 'react'
import { Navbar,Nav,Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket,faCartShopping} from '@fortawesome/free-solid-svg-icons'
import bookLogo from '../../assets/bookLogo1.webp'

export default function Header({count}) {

  
  async function logout() {
    localStorage.setItem("token",JSON.stringify([]));
  }

  
  return (
    <div>
    <Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand href="#home"></Navbar.Brand>
      <img src={bookLogo} style={{width:'10%'}}></img>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/addBooks">Add Books</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/login"><FontAwesomeIcon icon={faArrowRightFromBracket} onClick={()=>logout()}/></Nav.Link>
        <Nav.Link href="/panier"><FontAwesomeIcon icon={faCartShopping} />({count})</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
    </div>
  )
}
