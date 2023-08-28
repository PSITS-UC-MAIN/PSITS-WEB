import './App.css'
import DashboardUI from './components/Pages/DashboardUI'
import LoginUI from './components/Pages/LoginUI'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TimeLogUI from './components/Pages/TimeLogUI'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/timelog' index element={<TimeLogUI />}/>
          <Route path='/login' element={<LoginUI />}/>
          <Route path='/' element={<DashboardUI />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
