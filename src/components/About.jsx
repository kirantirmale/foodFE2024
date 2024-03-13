import React from 'react';
import Layout from './Layout/Layout';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box } from '@mui/material';


const About = () => {

    return (
        <Layout>
            <div className='about' >
                <div className='headerContainer1'>
                    <h1 className=''>Welcome to My Food Website</h1>
                    <h4>Best Food In Indian</h4>
                    <p>KIRAN A TIRMALE</p>

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
                        <YouTubeIcon />

                    </Box>
                </div>
            </div>
        </Layout>
    );
}

export default About;
