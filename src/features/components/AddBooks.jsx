import React,{useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios'
export default function AddBooks() {
    const [book,setBook]=useState({})
    const [category,setCategory]=useState('')
    const [data,setData]=useState([])
    
/************************* add new Book *****************************/


    async function addBooks(e){
      e.preventDefault()
      const tokenString = localStorage.getItem("token");
    console.log("tokenstring", tokenString);
    let userToken = JSON.parse(tokenString);
        
     
    userToken = userToken?.token;
    console.log("token", userToken);
    axios.defaults.headers.common["Authorization"] = userToken
    
        let obj={
            name:book.name,
            author:book.author,
            price:book.price,
            image:book.image,
            sold:book.sold,
            description:book.description,
            category:book.category,
            InStock:book.InStock,
        }
        await axios.post("http://localhost:5000/api/newBook",obj)
       window.location.href='/'
    }


    /************************* upload image *****************************/


    async function uploadImg(event){
        let data =new FormData()
        data.append('file',event.target.files[0])
        await axios.post("http://localhost:5000/api/upload",data).then((res)=>{
          setBook({...book,image:res.data.filename})
        })
      }


/************************* add category *****************************/


      async function addCategory(e){
        e.preventDefault()
        let obj={
          category:category,
        }
        await axios.post("http://localhost:5000/api/addCategory",obj)
        window.location.href='/addBooks'
       
      }



      /************************* display category *****************************/

      async function displayBooks(){
        let resp=await fetch("http://localhost:5000/api/display")
        let json=await resp.json()
        setData(json.categ)
    }

    useEffect(()=>{displayBooks()},[])

  return (
    <div>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Book Category</Form.Label>
      <Form.Control type="text" placeholder="Enter category" name="category" onChange={(e)=>setCategory(e.target.value)}/> 
    </Form.Group>
    <Button variant="primary" type="submit" onClick={(e)=>addCategory(e)}>
      Add Category
    </Button>
  </Form>


    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Book Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Book Name" name='name' onChange={(e)=>setBook({...book,name:e.target.value})}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Author Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Author Name" name='author' onChange={(e)=>setBook({...book,author:e.target.value})}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Book Image</Form.Label>
    <Form.Control type="file" placeholder="Enter Book Image" name='image' onChange={uploadImg}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Price</Form.Label>
  <Form.Control type="number" placeholder="Enter price" name='price' onChange={(e)=>setBook({...book,price:e.target.value})}/>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
<Form.Label>Sold</Form.Label>
<Form.Control type="number" placeholder="Enter Sold" name='sold' onChange={(e)=>setBook({...book,sold:e.target.value})}/>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
<Form.Label>Description</Form.Label>
<Form.Control type="text" placeholder="Enter description" name='description' onChange={(e)=>setBook({...book,description:e.target.value})}/>
</Form.Group>


<Form.Label>Category</Form.Label>
<Form.Select name='category' onChange={(e)=>setBook({...book,category:e.target.value})} value={book.category}>
<option>select Category</option>
{
  data.map((elem,i)=>{
    return(
      <option value={elem._id} key={i}>{elem.category}</option>
    )
  })
}
</Form.Select>


<Form.Group className="mb-3" controlId="formBasicPassword">
<Form.Label>In Stock</Form.Label>
<Form.Control type="number" placeholder="0" name='InStock' onChange={(e)=>setBook({...book,InStock:e.target.value})}/>
</Form.Group>
    <Button variant="primary" type="submit" onClick={(e)=>addBooks(e)}>
      Add Book
    </Button>
  </Form>
    </div>
  )
}
