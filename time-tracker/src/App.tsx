import { useState } from 'react'
import type {Time} from './types'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [entries, setEntries] = useState<Time[]>([]);
  const [taskName,setTaskName] = useState('');
  const [hoursWorked,setHoursWorked] = useState<number>(0);

  return (
    <>
      <div>
       
      </div>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
       
      </div>
     
    </>
  )
}

export default App
