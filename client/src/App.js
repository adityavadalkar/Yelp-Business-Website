import React, {useEffect, useState} from 'react'
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import BookingPage from './components/BookingPage'
import SearchPage from './components/SearchPage';
import './App.css'

function App() { 
  return (
    <div id="mask" style={{
      // backgroundImage: "url(/city.jpg)",
      // backgroundSize: 'cover',
      // backgroundRepeat: 'no-repeat',
      // backgroundAttachment: 'fixed',
      height: '100%',
      }}>
      <BrowserRouter style={{}}>
          <Nav className="mt-2 justify-content-end" defaultActiveKey="/search" style={{backgroundColor: "none"}}>
            <NavLink className="nav-link" to="/search" style={{color: 'black'}} activeclassname="active">Search</NavLink>
            <NavLink className="nav-link" to="/bookings" style={{color: 'black'}} activeclassname="active">Bookings</NavLink>
          </Nav>
        <Routes>
          <Route exact path="/search" element={<SearchPage />} />
          <Route exact path="/bookings" element={<BookingPage />} />
        </Routes>
      </BrowserRouter>
      <p style={{height: "20px", marginBottom: "0px"}}></p>
    </div>
  )
}

export default App