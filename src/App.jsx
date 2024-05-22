import './App.css';
import { useState } from 'react';
import Product from './components/Product';
import Home from './components/Home';
import Login from './components/Login';
import Adminpannel from './components/Adminpannel';
import About from './components/About';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Admin from './components/Admin';
import Contact from './components/Contact';

function App() {

  // const [isLogin, setisLogin] = useState(localStorage.getItem('token'));

  // console.log("isLogin",isLogin)

  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<Navigate to="/login" />}></Route>

            <Route path="/login" element={<Login />}></Route>

            <Route path="*" element={<Navigate to="/login" />}></Route>

            <Route path="/signup" element={<Signup />}></Route>

            <Route path="/" element={<Navigate to="/Home" />}></Route>

            <Route path="/home" element={<Home />}></Route>

            <Route path="/home" element={<Navigate to="/product" />}></Route>

            <Route path="/product" element={<Product />}></Route>

            <Route path="*" element={<Navigate to="/product" />}></Route>
            
            <Route path="/admin" element={<Admin />}></Route>

            <Route path="/home" element={<Navigate to="/admin" />}></Route>

            <Route path="/adminpannel" element={<Adminpannel />}></Route>

            <Route path="/home" element={<Navigate to="/adminpannel" />}></Route>

            <Route path="/About" element={<About />}></Route>
            
            <Route path="/home" element={<Navigate to="/About" />}></Route>

            <Route path="/contact" element={<Contact />}></Route>

            <Route path="/home" element={<Navigate to="/contact" />}></Route>

          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}


export default App;



{
  // isLogin == null ?
  //   <>
  //     <Route path="/" element={<Navigate to="/login" />}></Route>
  //     <Route path="/login" element={<Login />}></Route>
  //     <Route path="*" element={<Navigate to="/login" />}></Route>
  //     <Route path="/signup" element={<Signup />}></Route>
  //   </>
  //   :
  //   <>
  //     {/* <Route element={<Product />}></Route> */}
  //     <Route path="/" element={<Navigate to="/product" />}></Route>
  //     <Route path="/product" element={<Product />}></Route>
  //     <Route path="*" element={<Navigate to="/product" />}></Route>

  //   </>
}
