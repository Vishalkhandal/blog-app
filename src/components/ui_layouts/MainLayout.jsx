import React from 'react'
import Container from '../ui_components/container/Container'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet } from 'react-router'

function MainLayout() {
  return (
    <Container>
        <Header />
        <Outlet/>
        <Footer/>
    </Container>
  )
}

export default MainLayout