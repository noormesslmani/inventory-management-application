import { Navigate, Outlet } from "react-router-dom";


function PublicRoute({ component: Component, ...restOfProps }) {

    const user  =  localStorage.getItem('token')
  
      if( user ) {
        return <Navigate to="/products" replace />
      }

      return <Outlet />
  }


export default PublicRoute;