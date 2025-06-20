import { useState } from 'react'
import type { Time } from './types'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [entries, setEntries] = useState<Time[]>([]);
  const [taskName, setTaskName] = useState('');
  const [hoursWorked, setHoursWorked] = useState<number>(0);


  //handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //validate inputs
    if (!taskName.trim() || hoursWorked <= 0) return;

    //create new entry with unique ID
    const newEntry: Time = {
      id: Date.now().toString(),
      taskName,
      hoursWorked,
    };

    //Add to entries array
    setEntries([...entries,newEntry]);

    //Reset form
    setTaskName('');
    setHoursWorked(0);

  };

  //handle deleting an entry
  const handleDelete = (id:string)=>{
    setEntries(entries.filter(entry=>entry.id !== id));
  };

  return (
    <>
      <div className="">
        <h2>Time Tracker</h2> <hr></hr>
      </div>

      <div>
        <h4>Add New Entry</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='taskName'>Task Name : </label>
            <input type="text" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} required></input>
          </div>
          <br></br>
          <div>
            <label htmlFor='hoursWorked'>Hours Worked : </label>
            <input type='number' id='hoursWorked' value={hoursWorked || ''} onChange={(e) => setHoursWorked(Number(e.target.value))} min="0" step="0.25" placeholder="0" required></input>
          </div>
          <div><br></br>
            <button type="submit" className=''>Add Entry</button>
          </div>
        </form>
      </div>
      <br></br>
      <div>
        <div>
          <h4>
            Time Entries
          </h4>
        </div>
        <div>
          <label>Total : { }</label>
        </div>
        <div>
          {entries.length === 0 ? (
            <p>No entries yet. Add your first time entry above!</p>
          ) : (
            <ul>
              {entries.map((entry) => (
                <li key={entry.id}>
                  <div>
                    <h6>
                      {entry.taskName}
                    </h6>
                    <p>{entry.hoursWorked} hours</p>
                  </div>
                  <button></button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default App
