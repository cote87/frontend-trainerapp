import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css';
import { BrowserRouter } from 'react-router-dom'
import { TrainersApp } from './TrainersApp'
import { AuthProvider } from './auth/context/AuthProvider'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css';

const token = sessionStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}


ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <AuthProvider>
        <TrainersApp />
      </AuthProvider>
    </BrowserRouter>
  ,
)
