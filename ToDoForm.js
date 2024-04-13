import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const TodoForm = ({ addTask }) => {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('tasks.json');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = () => {
    if (tasks.length === 0) {
      // If there are no tasks fetched, do nothing
      return;
    }
    // Generate a random index to select a task
    const randomIndex = Math.floor(Math.random() * tasks.length);
    // Set the selected task in the input field
    setTaskText(tasks[randomIndex]);
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        onChangeText={(text) => setTaskText(text)}
        value={taskText}
      />
      <Button
        title="Generate Random Task"
        onPress={handleAddTask}
      />
      <Button
        title="Add Task"
        onPress={() => {
          addTask(taskText);
          // Clear the task input after it's been added.
          setTaskText('');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
});

export default TodoForm;
