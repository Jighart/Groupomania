import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import Navbar from '../Navbar'

const index = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="*" element={<Home />} />
                </Routes>
            </Router>
        </div>
    )
}

export default index
