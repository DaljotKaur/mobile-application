import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import TodoList from './ToDoList';
import TodoForm from './ToDoForm';


export default function App() {

  const [tasks, setTasks] = useState([
    'Do laundry',
    'Go to gym',
    'Walk dog'
  ]);

  const addTask = (taskText) => {

    // Don't allow duplicate tasks.
    if (tasks.includes(taskText)) {
      alert('duplicate task');
      return;
    }

    setTasks([...tasks, taskText]);
  };

  return (
    <SafeAreaView>
      <TodoList tasks={tasks} />
      <TodoForm addTask={addTask} />
    </SafeAreaView>
  );
}