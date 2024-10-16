import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import App from './App.jsx'
import './index.css'
import { store } from './utils/index.js'
import {Toaster} from "react-hot-toast"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <BrowserRouter >
          <App />
          <Toaster />
      </BrowserRouter>
    </Provider>

  </StrictMode>,
)
