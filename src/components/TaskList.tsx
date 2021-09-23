import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    // let randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;
  
    let valueIdRandom = generateId(tasks,10); 
    if(valueIdRandom &&  newTaskTitle.trim()){
      const newTasks = {
        id : valueIdRandom ,
        title: newTaskTitle,
        isComplete: false,
      }
      setTasks([newTasks, ...tasks])
      }
    }
   

  function generateId(arrayIterable:Task[], valueMax:number ){
    //Itera sobre o array de Task e verifica qual number aleatorio está disponível 
    let idRandom; 

    for(let i = 0; i< valueMax; i++){
      let randomNumber = Math.floor(Math.random() * (valueMax - 0)) + 0;
      let isExistIdNumber = arrayIterable.filter((task: { id: number; }) => task.id === randomNumber);
      if(!isExistIdNumber.length){
        return randomNumber;
      }
    }
    return null
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const newListTasks = tasks.map((value) =>{
      if( value.id === id) {
        return {
          id: value.id,
          title: value.title,
          isComplete: !value.isComplete,
        };
      }
      return value;
    })
    setTasks(newListTasks);
  }

  function handleRemoveTask(id: number) {
    let newTasks = tasks.filter((task:Task) => task.id !== id );
    setTasks([...newTasks])
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}