import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('userData'));
    let location = useLocation();

    if(!user) {
        return <Navigate to="/" replace />
    }
 return children

};

export default ProtectedRoute;