import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/signup'
import Landing from './pages/landing'
import JoinMeeting from './pages/JoinMeeting'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Registered' element={<SignUp/>} />
      <Route path='/landing' element={<Landing/>} />
      <Route path='/meeting' element={<JoinMeeting/>} />
    </Routes>
    </BrowserRouter>
  
      {/* <Button>Click me</Button> */}
    </>
  )
}

export default App
