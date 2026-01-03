//protected Container

import React, {useState, useEffect} from "react";
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}){

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    // Component reads auth status from Redux
    const authStatus = useSelector(state => state.auth.status)

    useEffect(()=>{
        //TODO make it more easy

        // If page requires login, but user is NOT logged in → send to Login page
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus, navigate, authentication])
    return loader ? <h1>Loading...</h1> : <>{children}</>
}



// authentication = true → page requires login
// authentication = false → page must be accessible only when logged-out