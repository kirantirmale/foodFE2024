import React from 'react'
import Layout from './Layout/Layout'
import { Link } from 'react-router-dom'
import Banner from '../Images/idli.jpg'
import '../styles/HomeStyle.css'
const Home = () => {

  return (
    <Layout>
      <div className='Home' style={{ backgroundImage: `url(${Banner})` }} >
        <div className='headerContainer w-25'>
          <h1 className=''>Food Website</h1>
          <p>Best Food In Indian</p>
          <Link to={"/product"}>
            <button id='btn1' className='btn1'>ORDER NOW  </button>
          </Link>
          
        </div>
        
      </div>
      
    </Layout>
  )
}
export default Home 
