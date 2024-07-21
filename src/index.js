import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import { AuthProvider } from './pages/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthProvider>
     <Router>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
      </Routes>
    </Router>
    </AuthProvider>
    {/* <App /> */}
    {/* <HomePage></HomePage> */}
    {/* <Login></Login> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
