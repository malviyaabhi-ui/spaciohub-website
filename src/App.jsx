import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import DemoModal from './components/DemoModal'
import { ModalProvider } from './components/ModalContext'
import WhatsApp from './components/WhatsApp'

import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Roles from './pages/Roles'
import Blog from './pages/Blog'
import HelpCentre from './pages/HelpCentre'
import Contact from './pages/Contact'
import Changelog from './pages/Changelog'
import Privacy from './pages/Privacy'
import Security from './pages/Security'
import Terms from './pages/Terms'
import Cookies from './pages/Cookies'

import RolesCorporate from './pages/use-cases/Corporate'
import RolesCoworking from './pages/use-cases/Coworking'
import RolesHotels from './pages/use-cases/Hotels'
import RolesResellers from './pages/use-cases/Resellers'

import PlatformBooking from './pages/platforms/Booking'
import PlatformVisitors from './pages/platforms/Visitors'
import PlatformDoorDisplay from './pages/platforms/DoorDisplay'
import PlatformAnalytics from './pages/platforms/Analytics'
import PlatformAIBooker from './pages/platforms/AIBooker'
import PlatformIntegrations from './pages/platforms/Integrations'

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
    const observe = () => document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el))
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
          {/* Main */}
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/contact" element={<Contact />} />

          {/* Platform */}
          <Route path="/platform/booking" element={<PlatformBooking />} />
          <Route path="/platform/visitors" element={<PlatformVisitors />} />
          <Route path="/platform/door-display" element={<PlatformDoorDisplay />} />
          <Route path="/platform/analytics" element={<PlatformAnalytics />} />
          <Route path="/platform/ai-booker" element={<PlatformAIBooker />} />
          <Route path="/platform/integrations" element={<PlatformIntegrations />} />

          {/* Use Cases */}
          <Route path="/use-cases/corporate" element={<RolesCorporate />} />
          <Route path="/use-cases/coworking" element={<RolesCoworking />} />
          <Route path="/use-cases/hotels" element={<RolesHotels />} />
          <Route path="/use-cases/resellers" element={<RolesResellers />} />

          {/* Resources */}
          <Route path="/help" element={<HelpCentre />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/changelog" element={<Changelog />} />

          <Route path="/security" element={<Security />} />

          {/* Legal */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
        <Footer />
        <DemoModal />
        <WhatsApp />
      </ModalProvider>
    </BrowserRouter>
  )
}
