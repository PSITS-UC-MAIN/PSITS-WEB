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
          <Route path='/' index element={<DashboardUI />}/>
          <Route path='timelog' element={<TimeLogUI />}/>
          <Route path='login' element={<LoginUI />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
