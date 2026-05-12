import React from 'react'
import{BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Audit from './pages/Audit'
import SharedResult from './pages/SharedResult'


const App = () => {
  return (
   <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/result/:id" element={<SharedResult />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
