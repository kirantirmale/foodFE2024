import React from 'react'
import { Box } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';


const Footer = () => {
  return (
    <Box
      sx={{
        zIndex:'50',
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        bgcolor: "black",
        color: "white",
        p: 3
      }}
    >
      <Box sx={{ my: '0', "& svg": { fontSize: "30px", cursor: "pointer", mr: 5 } }}>
        <InstagramIcon href='https://www.instagram.com/mr_devil_2361'></InstagramIcon>
        <TwitterIcon />
        <GitHubIcon />
        <YouTubeIcon />
      </Box>
    </Box>
  )
}

export default Footer
