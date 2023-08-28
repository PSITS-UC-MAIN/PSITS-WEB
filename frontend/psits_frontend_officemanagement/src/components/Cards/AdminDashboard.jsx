import React, { useEffect, useState } from 'react'
import Calendar from '../Utils/Calendar'
import { Get5DaysBefore } from '../../utilities/server_utils'

function AdminDashboard({className}) {
    const [data, setData] = useState(null);
    const [Loading, setIsLoading] = useState(false);
    const [datePicked, setDatePicked] = useState(new Date().toISOString().split('T')[0]);
    
    useEffect(()=>{
        LoadData();
        // update in 60 seconds
        const refreshData = setInterval(()=>{LoadData()}, 60_000);

        return () => clearInterval(refreshData);
    }, [datePicked])

    async function LoadData(){
        setIsLoading(true)
        const api_data = await Get5DaysBefore(new Date(datePicked));
        setData(api_data);
        setIsLoading(false)
    }

    function handleDatePicker({target}){
        setDatePicked(new Date(target.value).toISOString().split('T')[0])
    }
  return (
    <div className={`adminCard ${className}`}>
        <div className="card">
        <h1>Office Logs</h1>
        <div className='flex'>
            <label htmlFor='datePicker'>Select date: </label>
            <input id='datePicker' className='date-picker' type='date' value={datePicked} onInput={handleDatePicker}/>
        </div>
        <Calendar calendarData={data}/>
        </div>
    </div>
  )
}

export default AdminDashboard