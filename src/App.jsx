import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar.jsx'
import Cards from './components/Cards.jsx'
import Dashboard from './components/Dashboard.jsx'


function App() {

  return (
    <div className="App">
      <Sidebar />
      <Cards />
      <Dashboard />
    </div>
      
  )
}

export default App
