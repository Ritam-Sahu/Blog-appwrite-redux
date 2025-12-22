import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authService from  './appwirte/auth'
import {login, logout} from './features/authSlice'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

function App() {
  
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{setLoading(false)})
  },[])




  return !loading ? (<div className='min-h-sc flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <Footer />
    </div>
  </div>) : null

  // if(loading){
  //   return <>Loading...</>
  // }else{
  //   null
  // }
}

export default App
