import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { Navigation } from "./utils"



const App = () => {
  return (
    <div className="">
        <Navigation />

      <Routes >
        <Route path="/" element={<Home/>}/>
        </Routes>
      
      
    </div>
  )
}

export default App
