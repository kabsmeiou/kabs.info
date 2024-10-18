import { useState } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom"

import './App.css'

import Header from "./components/Header"
import About from "./pages/About"
import Portfolio from "./pages/Portfolio"
import Timeline from "./pages/Timeline"
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={ <About /> }/>
          <Route path="/portfolio" element={ <Portfolio /> }/>
          <Route path="/timeline" element={ <Timeline /> }/>
          <Route path="*" element={ <NotFound /> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
