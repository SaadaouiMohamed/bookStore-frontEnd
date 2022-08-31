import React,{useState,useEffect} from 'react'
import ItemBook from './ItemBook'
import '../../css/home.css'
export default function Home(props) {
    const [data,setData]=useState([])

    async function displayBooks(){
        let resp=await fetch("http://localhost:5000/api/display")
        let json=await resp.json()
        setData(json.book)
    }
console.log(data)
    useEffect(()=>{displayBooks()},[])
    const list = data.filter((item)=>{
      return(
        item.name.toLowerCase().includes(props.search.toLowerCase()) || item.author.toLowerCase().includes(props.search.toLowerCase()) ||item.category.category.toLowerCase().includes(props.search.toLowerCase())
      )
    }).map((elem,i)=>{
        return(
            <li key={i} id='li'><ItemBook item={elem} count={props.count} setCount={props.setCount}/></li>
        )
    })
  return (
    <div>
    <ul id='list'>
    {list}
    </ul>
    </div>
  )
}
