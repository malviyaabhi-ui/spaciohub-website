import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import WhatsApp from './components/WhatsApp'
import DemoModal from './components/DemoModal'
import { ModalProvider } from './components/ModalContext'

import Home from './pages/Home'
import Pricing from './pages/Pricing'
import RolesCorporate from './pages/use-cases/Corporate'
import RolesCoworking from './pages/use-cases/Coworking'
import RolesHotels from './pages/use-cases/Hotels'
import RolesResellers from './pages/use-cases/Resellers'
import PlatformBooking from './pages/platforms/Booking'
import PlatformVisitors from './pages/platforms/Visitors'
import Roles from './pages/Roles'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function RevealObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    const observe = () => document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    observe()
    const mo = new MutationObserver(observe)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { obs.disconnect(); mo.disconnect() }
  }, [])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <ScrollTop />
        <RevealObserver />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/use-cases/corporate" element={<RolesCorporate />} />
          <Route path="/use-cases/coworking" element={<RolesCoworking />} />
          <Route path="/use-cases/hotels" element={<RolesHotels />} />
          <Route path="/use-cases/resellers" element={<RolesResellers />} />
          <Route path="/platform/booking" element={<PlatformBooking />} />
          <Route path="/platform/visitors" element={<PlatformVisitors />} />
          <Route path="/roles" element={<Roles />} />
        </Routes>
        <Footer />
        <WhatsApp />
        <DemoModal />
      </ModalProvider>
    </BrowserRouter>
  )
}
