import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ClientForm from './components/ClientForm';
import './normalize.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/client' element={<ClientForm />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
