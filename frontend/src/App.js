import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Landing from './views/landing';
import Items from './views/items';
import { Routes, Route, BrowserRouter, Outlet, redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Products from './views/products';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './routes/protected';
import PublicRoute from './routes/public';
import Profile from './views/profile';
import { MenuProvider } from './context/menuContext';
function App() {
  return (
    <>
      <MenuProvider>
       <ToastContainer />
      
        <BrowserRouter>
        <Routes>
          
        <Route element={<PublicRoute/>}>
          <Route path='/' element={<Landing/>}></Route>
        </Route>

        <Route element={<ProtectedRoute/>}>
          <Route path='/products' element={<Products/>}></Route>
          <Route path='/products/:id/items' element={<Items/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Route>
          
        
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  </>
  );
}

export default App;
