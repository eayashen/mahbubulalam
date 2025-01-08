import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Journal from './components/Journal';
import FundingHistory from './components/FundingHistory';
import Contact from './components/Contact';
import Login from './components/Login';
import Research from './components/Research';
import Test from './components/Test';

const App = () => {

  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/research' element={<Research />} />
            <Route path='/journal' element={<Journal />} />
            <Route path='/working-paper' element={<Journal />} />
            <Route path='/policy' element={<Journal />} />
            <Route path='/fundinghistory' element={<FundingHistory />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/test' element={<Test />} />
          </Routes>
        </div>
        <footer className='text-center bg-indigo-950 text-white py-2'>
          © 2023 <Link to='/login'>Mahbub Ul Alam</Link>. All rights reserved.
        </footer>
      </Router>
    </div>
  );
}

export default App;
