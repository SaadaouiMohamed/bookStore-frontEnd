import React, {useState } from 'react';
import { Counter } from './features/counter/Counter';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Main from './features/components/Main';
import Home from './features/components/Home';
import AddBooks from './features/components/AddBooks';
import BookDetail from './features/components/BookDetail'
import SignIn from './features/components/SignIn'
import SignUp from './features/components/SignUp'
import Panier from './features/components/Panier';
function App() {


  const [count,setCount] = useState(JSON.parse(localStorage.getItem('list'))===null?([]).length:JSON.parse(localStorage.getItem('list')).length)

  

  const [search,setSearch] = useState('')
 
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<SignIn/>}></Route>
     <Route path='/register' element={<SignUp/>}></Route>
     <Route path='/' element={<Main count={count} search={search} setSearch={setSearch}/>}>
     <Route path='/home' element={<Home count={count} setCount={setCount} search={search}/>}></Route>
     <Route path='/addBooks' element={<AddBooks/>}></Route>
     <Route path='/detail/:id' element={<BookDetail count={count} setCount={setCount}/>}></Route>
     
     <Route path='/panier' element={<Panier count={count} setCount={setCount}/>}></Route>
     </Route>
     
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
