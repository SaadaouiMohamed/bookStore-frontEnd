import React,{useEffect, useState} from 'react'
import {Card,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'


import Rating from './Rating';
export default function ItemBook(props) {

  const [storage,setStorage]=useState(JSON.parse(localStorage.getItem('list')) || [])

  const [qty, setQty] = useState(1);


    function calculSold(sold,price){
        let res=price;
        res=res-((sold*price)/100)
        return res
    }


    /************************************** add to basket *************************/


function addToBasket (){
  localStorage.setItem('list',JSON.stringify([...storage,{...props.item,qty:qty}]))
  props.setCount(props.count + 1)
}







  return (
   
    <Card style={{width: '18rem',marginTop:'2%',textAlign:'center'}} id='card'>
    <Card.Img variant="top" src={`http://localhost:5000/static/${props.item.image}`} style={{ width:'286px',height:'180px'}}/>
    <Card.Body>
      <Card.Title>{props.item.name}</Card.Title>
      <Card.Text>
        {props.item.author}
      </Card.Text>
      <Card.Text>
        {props.item.category.category}
      </Card.Text>
      <Card.Text><Rating rating={props.item.rating}/></Card.Text>
      <Button variant="primary" href={`/detail/${props.item._id}`}>See Details</Button>
    </Card.Body>
    <Card.Footer className="text-muted">
    <Card.Text style={{textDecoration:"line-through",color:"red"}}>
        {props.item.price}$
      </Card.Text>
    {calculSold(props.item.sold,props.item.price)}$
    <FontAwesomeIcon icon={faCartShopping} onClick={()=>{addToBasket()}}/>
    </Card.Footer>
  </Card>
    
  )
}
