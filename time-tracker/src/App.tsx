import { useState } from 'react';
import type { Time } from './types';
import Timer from './components/Timer';
import './App.css';

function App() {
  const [entries, setEntries] = useState<Time[]>([]);
  const [taskName, setTaskName] = useState('');
  const [hoursWorked, setHoursWorked] = useState<number>(0);
  const [editId, setEditId] = useState<string | null>(null);

  //calculate total hours
  const totalHours = entries.reduce((sum, entry) => sum + entry.hoursWorked, 0);

  //handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //validate inputs
    if (!taskName.trim() || hoursWorked <= 0) return;

    if (editId) {
      //update existing entry
      setEntries(entries.map(entry =>
        entry.id === editId ? { ...entry, taskName, hoursWorked } : entry
      ));
      setEditId(null);
    } else {
      //create new entry with unique ID
      const newEntry: Time = {
        id: Date.now().toString(),
        taskName,
        hoursWorked,
      };

      //Add to entries array
      setEntries([...entries, newEntry]);
    }

    //Reset form
    setTaskName('');
    setHoursWorked(0);
  };

  //handle editing an entry
  const handleEdit = (id: string) => {
    const entryToEdit = entries.find(entry => entry.id === id);
    if (entryToEdit) {
      setTaskName(entryToEdit.taskName);
      setHoursWorked(entryToEdit.hoursWorked);
      setEditId(id);
    }
  };

  //handle deleting an entry
  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    if (editId === id) {
      setEditId(null);
      setTaskName('');
      setHoursWorked(0);
    }
  };
  
  //handles timer completion from timer component
  const handleTimerComplete = (completedTaskName: string, completedHours: number) => {
    const newEntry: Time = {
      id: Date.now().toString(),
      taskName: completedTaskName,
      hoursWorked: completedHours,
    };
    setEntries(prev => [...prev, newEntry]);
  };

  return (
    <>
      <div className="">
        <h2>Time Tracker</h2> <hr></hr>
      </div>

      {/*flex container for form & timer side-by sode*/}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* 'Create New Entry' form - lefy side */}
        <div style={{ flex: 1 }}>
          <h4>Add New Entry</h4>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='taskName'>Task Name : </label><br/>
              <input type="text" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} required></input>
            </div>
            <br></br>
            <div>
              <label htmlFor='hoursWorked'>Hours Worked : </label><br/>
              <input type='number' id='hoursWorked' value={hoursWorked || ''} onChange={(e) => setHoursWorked(Number(e.target.value))} min="0" step="0.01" placeholder="0" required></input>
            </div>
            <br></br>
            <div>
              <button type="submit" className=''>
                {editId ? 'Update' : 'Add'} Entry
              </button>
              {editId && (
                <button type="button" onClick={() => {
                  setEditId(null);
                  setTaskName('');
                  setHoursWorked(0);
                }}>Cancel</button>
              )}
            </div>
          </form>
        </div>

        {/*timer component - right side */}
        <div style={{ flex: 1 }}>
          <h4>Time Tracker</h4>
          <Timer onTimerComplete={handleTimerComplete}/>
        </div>
      </div>

      {/* time entries list */}
      <br></br>
      <div>
        <div>
          <h4>Time Entries</h4>
        </div>

        <div>
          {entries.length === 0 ? (
            <p>No entries yet. Add your first time entry above!</p>
          ) : (
            <ul className='text-left'>
              {entries.map((entry) => (
                <li key={entry.id}>
                  <div>
                    {entry.taskName} | {entry.hoursWorked.toFixed(2)} hours |
                    <button 
                      onClick={() => handleEdit(entry.id)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    >edit</button>
                    <button 
                      onClick={() => handleDelete(entry.id)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    >delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label><hr></hr>Total : {totalHours.toFixed(2)} hours<hr></hr></label>
        </div>
      </div>
    </>
  )
}

export default App;