import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/signup'
import Landing from './pages/landing'
import JoinMeeting from './pages/JoinMeeting'
import Login from './pages/Login'
import Profile from './pages/Profile'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/meeting' element={<JoinMeeting />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
