// src/main.jsx

import React from "react"
import ReactDOM from "react-dom/client"
import {
  BrowserRouter,
} from "react-router-dom"

import App from "./App"

import "./index.css"

import {
  StaffProvider,
} from "./context/StaffContext"

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <StaffProvider>
        <App />
      </StaffProvider>
    </BrowserRouter>
  </React.StrictMode>
)