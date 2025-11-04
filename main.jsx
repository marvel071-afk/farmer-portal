import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import Marketplace from './views/Marketplace'
import Dashboard from './views/Dashboard'
import './styles.css'

function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <nav className="bg-green-600 text-white p-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">KisaanConnect</Link>
          <div className="space-x-4">
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/marketplace" element={<Marketplace/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
