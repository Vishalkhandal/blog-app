import React from 'react'
import Container from '../ui_components/container/Container'
import Header from '../Header'
import { Outlet } from 'react-router'
import Footer from '../Footer'

function AuthLayout() {
  return (
    <Container>
        <Header />
        <Outlet/>
        <Footer/>
    </Container>
  )
}

export default AuthLayout