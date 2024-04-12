import React, { useEffect } from 'react';
import './index.css';
import Layout from './layout/Layout'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Login from './login/login';
import Signup from './signup/signup';
import Books from './components/books/Books';
import Userdetails from './components/userdetails/userdetails';
import EditProfile from './editprofile/editprofile';
import AddBook from './components/books/AddBook';
import EditBook from './components/books/EditBook';
import AddOffer from './components/books/AddOffer';
import BookDetails from './components/books/BookDetails';

export default function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/login');
        }
        else {
            navigate('/layout/dashboard')
        }
    }, []);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/editprofile" element={<EditProfile />} />

            <Route path="/layout" element={<Layout />} >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path='books' element={<Books />} />
                <Route path="books/addbook" element={<AddBook />} />
                <Route path="books/editbook/:BookID" element={<EditBook />} />
                <Route path="books/addoffer/:BookID" element={<AddOffer />} />
                <Route path="books/bookdetails/:BookID" element={<BookDetails />} />
                <Route path="users" element={<Userdetails />} />
            </Route>
            {/* <Route path="*" element={<Navigate to="/404" />} /> */}
        </Routes>
    );
}



//   export default App;