import { useState } from 'react'
import type { Time } from './types'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [entries, setEntries] = useState<Time[]>([]);
  const [taskName, setTaskName] = useState('');
  const [hoursWorked, setHoursWorked] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <>
      <div className="">
        <h2>Time Tracker</h2> <hr></hr>
      </div>

      <div>
        <h4>Add New Entry</h4>
        <form onSubmit={handleSubmit}></form>
        <div>
          <label htmlFor='taskName'>Task Name : </label>
          <input type="text" id="taskName" value={taskName} onChange={(e)=>setTaskName(e.target.value)} required></input>
        </div>
        <br></br>
        <div>
          <label htmlFor='hoursWorked'>Hours Worked : </label>
          <input type='number' id='hoursWorked' value={hoursWorked || ''} onChange={(e)=>setHoursWorked(Number(e.target.value))} min="0" step="0.25" placeholder="0" required></input>
        </div>
      </div>
    </>
  )
}

export default App
