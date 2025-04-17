// React & React Router
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom' // Importa BrowserRouter

//CSS
import './style/index.css'

//Routes
import App from './pages/App.jsx'
import Dashboard from './pages/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path='/app' element={<App />} />


      </Routes>


    </BrowserRouter>
  </StrictMode>,
)
