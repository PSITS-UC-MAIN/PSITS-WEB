import './App.css'
import DashboardUI from './components/Pages/DashboardUI'
import LoginUI from './components/Pages/LoginUI'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import TimeLogUI from './components/Pages/TimeLogUI'

function App() {
  return (
    <>
      <Outlet />
    </>
  )
}

export default App
