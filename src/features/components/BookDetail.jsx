import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'


import axios from 'axios'
import Rating from './Rating'
import '../../css/BookDetail.css'

export default function BookDetail(props) {
    let location =useParams()
   

    const [storage,setStorage] = useState(JSON.parse(localStorage.getItem('list')) || [])
     
  
    const [qty, setQty] = useState(1);

   
/******************* add reviews ****************************/
    
const [review,setReview]=useState({})

async function addReviews(e){
    e.preventDefault()
    const tokenString = localStorage.getItem("token");
    console.log("tokenstring", tokenString);
    let userToken = JSON.parse(tokenString);
        
     
    userToken = userToken?.token;
    console.log("token", userToken);
    axios.defaults.headers.common["Authorization"] = userToken
    let obj={
        comment:review.comment,
        rating:review.rating
    }
    await axios.post(`http://localhost:5000/api/${location.id}/reviews`,obj)

window.location.href='/detail'+location.id

    
}


/******************calcul sold **********************/


function calculSold(sold,price){
    let res=price;
    res=res-((sold*price)/100)
    return res
}


/***************** display details *************************/
const [data,setData]=useState({})

async function fetchDetails(){
    let resp=await fetch('http://localhost:5000/api/detail/'+location.id)
    let json=await resp.json()
    console.log(json);
    setData(json.book)
}


useEffect(()=>{fetchDetails()},[])


/********************************* display review *************************/


const[comment,setComment]=useState([])

async function fetchReviews(){
    let resp=await fetch('http://localhost:5000/api/detail/'+location.id)
    let json=await resp.json()
    console.log(json);
    setComment(json.book.reviews)
}
console.log(comment);


 let displayReview=comment.map((elem) => {
            return(
    
         <li key={elem._id}>
         <p style={{fontWeight:'bold'}}>{elem.name}</p>
         <p style={{fontSize:10}}>{<Rating rating={elem.rating}/>}</p>
         <p>{elem.comment}</p>
        </li>
        
            )
 })

useEffect(()=>{fetchReviews()},[])


/************************************** add to basket *************************/


let addToBasket= ()=>{
    props.setCount(props.count+1)
    let basket=storage
    basket=[...basket,{...data,qty:qty}]
    localStorage.setItem('list',JSON.stringify(basket))
            
}




  return (
    <div className='detailBook'>
    <section id='detailSection'>

    <article id='imgArticle'>
    <figure>
    <img src={`http://localhost:5000/static/${data.image}`} alt={data.name}/>
    </figure>
    <p>Price  <span style={{textDecoration:"line-through",color:"red",fontSize:25}}>{data.price}$</span></p>
    <p>After discount  <span style={{color:"green",fontSize:25}}>{calculSold(data.sold,data.price)}$</span></p>
    <p>Discount  <span>{data.sold}%</span></p>
    <div id='divBtn'>
    <button onClick={()=>{addToBasket()}}
        
    ><FontAwesomeIcon icon={faCartShopping}/> Add to basket</button>
    </div>
    </article>


    <article id='descArticle'>
    <h4>Title :</h4>
    <h5>{data.name}</h5>
    <h4>Author :</h4>
    <h5>{data.author}</h5>
    <div style={{display:'flex'}}>
    <h4>Rating :</h4>
    <p><Rating rating={data.rating}/></p>
    </div>
    <h4>About the book :</h4>
    <p>{data.description}</p>
    
    </article>
    </section>

   <div className='displayReview'>
   <ul>
   {displayReview}
   </ul>
   </div>
 


    <div className='addReview'>
    <form method='post' id='reviewForm'>
    <h3>Rate this book</h3>
    
    <input type='radio' value='1' name='rating' onChange={(e)=>setReview({...review,rating:Number(e.target.value)})} className='rating'></input>
    <label className='labelRadio'>1</label>
    <input type='radio' value='2' name='rating' onChange={(e)=>setReview({...review,rating:Number(e.target.value)})} className='rating'></input>
    <label className='labelRadio'>2</label>
    <input type='radio' value='3' name='rating' onChange={(e)=>setReview({...review,rating:Number(e.target.value)})} className='rating'></input>
    <label className='labelRadio'>3</label>
    <input type='radio' value='4' name='rating' onChange={(e)=>setReview({...review,rating:Number(e.target.value)})} className='rating'></input>
    <label className='labelRadio'>4</label>
    <input type='radio' value='5' name='rating' onChange={(e)=>setReview({...review,rating:Number(e.target.value)})} className='rating'></input>
    <label className='labelRadio'>5</label><br></br>
   
    <input type='text' placeholder='add Comment' name='comment' onChange={(e)=>setReview({...review,comment:e.target.value})} id='commentInput'></input><br/>
    <button type='submit' onClick={(e)=>addReviews(e)} id='commentBtn'>Add Review</button>
    </form>
    </div>

  

    </div>
  )
}
