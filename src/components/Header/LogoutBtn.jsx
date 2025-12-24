import React from "react";
import {useDispatch} from "react-redux"
import authService from "../../appwirte/auth"
import {logout} from "../../features/authSlice"

function LogoutBtn(){

    const dispatch = useDispatch();
    const logoutHandeller = () =>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
    }

    return(
        <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={logoutHandeller}>Logout</button>
    )
}

export default LogoutBtn;