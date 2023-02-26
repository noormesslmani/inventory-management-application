import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoute({ component: Component, ...restOfProps }) {

    const user  =  localStorage.getItem('token')
  
      if( !user ) {
        return <Navigate to="/" replace />
      }

      return <Outlet />
  }


export default ProtectedRoute;
