import { useState } from 'react'
import type { Time } from './types'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [entries, setEntries] = useState<Time[]>([]);
  const [taskName, setTaskName] = useState('');
  const [hoursWorked, setHoursWorked] = useState<number>(0);

const handleSubmit = (e:React.FormEvent)=>{
  e.preventDefault();
}

  return (
    <>
      <div className="">
        <h2>Time Tracker</h2>
      </div>

<div>
  <h4>Add New Entry</h4>
  <form onSubmit={handleSubmit}></form>
</div>
    </>
  )
}

export default App
