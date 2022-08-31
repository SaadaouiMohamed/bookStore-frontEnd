import React from 'react'
import { Navbar,Nav,Container, Form, Button, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket,faCartShopping,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import bookLogo from '../../assets/bookLogo1.webp'

export default function Header(props) {

  
  async function logout() {
    localStorage.setItem("token",JSON.stringify([]));
  }

  
  return (
    <div>
    <Navbar bg="light" variant="light">
    <Container>
    <Row>
    <Col>
      
      <Nav className="me-auto">
      <img src={bookLogo} style={{width:'10%'}}></img>
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/addBooks">Add Books</Nav.Link>
        <Nav.Link href="/">Login</Nav.Link>
        
      </Nav>
      </Col>
      <Col lg={4}>
      <Nav className="me-auto">
      <Nav.Link href="/"><FontAwesomeIcon icon={faArrowRightFromBracket} onClick={()=>logout()}/></Nav.Link>
        <Nav.Link href="/panier"><FontAwesomeIcon icon={faCartShopping} />({props.count})</Nav.Link>
      <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder='book name/author/category'
        className="me-2"
        aria-label="search"
        onChange={(e)=>props.setSearch(e.target.value)}
      />
    </Form>
    </Nav>
    </Col>
    </Row>
    </Container>
  </Navbar>
    </div>
  )
}
