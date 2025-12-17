import './App.css'

function App() {
  
  console.log(import.meta.env.VITE_APPWRITE_END_POINT);
  console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID);
  
  return (
  <>
    <h1>Hello Mega Blog</h1>
  </>
  )
}

export default App
