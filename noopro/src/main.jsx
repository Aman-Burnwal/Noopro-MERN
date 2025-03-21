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
      <BrowserRouter
            future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
       >
          <App />
          <Toaster />
      </BrowserRouter>
    </Provider>

  </StrictMode>,
)
