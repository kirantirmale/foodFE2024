import React, { useEffect } from 'react';
// import Contact from '../Images/about.jpg'
import Layout from './Layout/Layout';
// import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Copyright(props) {
   
    // const logout = () => {
    //     localStorage.removeItem('token');
    // };
    // onClick={logout()}
    
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            
            <Link color="inherit" >
                LOG OUT
            </Link>{' '}
            
        </Typography>
    );
}
const Contact = () => {

    return (<Layout>
        <div className='Contact' >

            <div className='headerContainer2'>
                <h1 className=''>Contact </h1>
                <h4>Best Food In Indian</h4>
                <Typography variant="body2" color="text.secondary" align="center" >

                <Copyright sx={{ mt: 8, mb: 4 }} />

                </Typography>


                <Box sx={{
                    my: 3, "& svg": {
                        fontSize: "30px",
                        cursor: "pointer",
                        mr: 5,
                    },

                }}>
                    <InstagramIcon href='https://www.instagram.com/mr_devil_2361'></InstagramIcon>
                    <TwitterIcon />
                    <GitHubIcon />
                    <YouTubeIcon  />

                </Box>
            </div>
        </div>
        
    </Layout>
    );

}

export default Contact;
