import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Landing from './views/landing';
import { Routes, Route, BrowserRouter, Outlet, redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Products from './views/products';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
       <ToastContainer />
      
      <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
      
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;