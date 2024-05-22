import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <h1>{children}</h1>
      {/* <Footer /> */}
    </>
  )
}
export default Layout