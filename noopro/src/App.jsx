import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"


const App = () => {
  return (
    <div className="">

    <Routes >
      <Route path="/" element={<Home/>}/>
    </Routes>
      
    </div>
  )
}

export default App
