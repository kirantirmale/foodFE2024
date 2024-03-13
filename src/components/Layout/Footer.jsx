
import React from 'react'
import { Box, Typography } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ textAlign: "center",
     bgcolor: "black",
      color: "white",
       p: 3 }}>

        <Box sx={{my:3, "& svg":{
          fontSize:"30px",
          cursor:"pointer",
          mr:5,
        } ,
       
        }}>
          <InstagramIcon href='https://www.instagram.com/mr_devil_2361'></InstagramIcon>
          <TwitterIcon/>
          <GitHubIcon/>
          <YouTubeIcon/>

        </Box>
     
    </Box>
  )
}
export default Footer




