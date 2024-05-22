import React, { useState } from 'react'

import { AppBar, Typography, Box, Toolbar, IconButton, Drawer, Divider } from '@mui/material'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { NavLink } from 'react-router-dom';
import "../../styles/HeaderStyle.css"
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [mobileopen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileopen)
  }

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to home page or login page
    window.location.href = '/'; // Redirect to home page
  };

  const drwer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }} >
      <Typography
        color={'goldenrod'}
        variant='h6'
        component={"div"}
        sx={{ flexGrow: 2, fontSize: "20px" }}
      >
        <FastfoodIcon />
        My Resturant
      </Typography>

      <ul className='navigation'>
        <li>
          <NavLink activeClassName="active" to={"/home"}>Home</NavLink >
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink >
        </li>
        <li>
          <NavLink to={"/about"}>About</NavLink >
        </li>
        <li>
          <NavLink to={"/contact"}>Contact</NavLink >
        </li>
        <li>
          <NavLink to={"/admin"}>Admin</NavLink >
        </li>
        <li>
          <NavLink onClick={handleLogout}>LogOut</NavLink>
        </li>

      </ul>
    </Box>
  )
  return (
    <>

      <Box className='w-full top-0 relative ' >
        <AppBar component={"nav"} sx={{ bgcolor: "black" }} >
          <Toolbar>

            <Typography
              color={'goldenrod'}
              variant='h6'
              component={"div"}
              sx={{ flexGrow: 1 }}
            >
              <FastfoodIcon />
              HAPPY FOODIE
            </Typography>
            <IconButton
              color=''
              sx={{
                mr: 2,
                display: { sm: "none" },
                width:'35px',
                border: '1px solid', // Adds a border
                borderRadius: '5px', // Adds rounded corners
              }}
              onClick={handleDrawerToggle}
            >
              <i className="fa-solid fa-bars text-white"></i>
            </IconButton>

            <Divider />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className='navigation-menu'>
                <li>
                  <NavLink activeClassName="active" to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/product"}>Product</NavLink>
                </li>
                <li>
                  <NavLink to={"/about"}>About</NavLink>
                </li>
                <li>
                  <NavLink to={"/contact"}>Contact</NavLink>
                </li>

                <li>
                  <NavLink to={"/adminpannel"}>Admin</NavLink>
                </li>
                <li>
                  <NavLink onClick={handleLogout}>LogOut</NavLink>
                </li>

              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer variant='temporary' open={mobileopen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px"
              },
            }}
          >
            {drwer}
          </Drawer>
        </Box>
        <Box >
          <Toolbar />
        </Box>
      </Box>
    </>
  )
}
export default Header;