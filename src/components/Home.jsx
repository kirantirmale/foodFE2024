import React, { useState, useEffect } from 'react';
import Layout from './Layout/Layout';
import { Link } from 'react-router-dom';
import Banner1 from '../Images/banner1.jpg';
import Banner2 from '../Images/banner2.jpg';
import Banner3 from '../Images/banner3.jpg';
import Banner4 from '../Images/banner4.jpg';
import Banner5 from '../Images/banner5.jpg';
import Banner6 from '../Images/banner6.jpeg';
import '../styles/HomeStyle.css';

const banners = [Banner1, Banner2, Banner3 ,Banner4,Banner5,Banner6];

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className='Home' style={{ backgroundImage: `url(${banners[currentBanner]})` }} >
        <div className='headerContainer '>
          <h1>Food Website</h1>
          <p>Best Food In India</p>
          <Link to="/product">
            <button id='btn1' className='btn1'>ORDER NOW</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
