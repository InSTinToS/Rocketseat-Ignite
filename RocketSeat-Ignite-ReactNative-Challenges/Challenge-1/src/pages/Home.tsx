import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTaskTitle: string) => {
    setTasks((before) => [
      ...before,
      {
        done: false,
        title: newTaskTitle,
        id: new Date().getTime(),
      },
    ]);
  };

  const handleToggleTaskDone = (id: number) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) task.done = !task.done;
      return task;
    });

    setTasks(newTasks);
  };

  const handleRemoveTask = (id: number) => {
    setTasks((beforeTasks) => beforeTasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        removeTask={handleRemoveTask}
        toggleTaskDone={handleToggleTaskDone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
