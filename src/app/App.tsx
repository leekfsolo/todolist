import React, { SyntheticEvent, useRef, useState } from "react";
import { generateRandomId } from "../common/utils/helper";

import styles from "./App.module.scss";
import { NavItem, Task } from "./model";

const App = () => {
  const [navItems, setNavItems] = useState<Array<NavItem>>([
    {
      title: "All",
      active: true,
    },
    { title: "Active" },
    { title: "Completed" },
  ]);
  const [tasks, setTasks] = useState<Array<Task>>([
    { title: "Do coding Challenges", done: false, id: generateRandomId() },
    { title: "Do coding Challenges", done: false, id: generateRandomId() },
    { title: "Do coding Challenges", done: true, id: generateRandomId() },
  ]);

  const taskInputRef = useRef<HTMLInputElement>(null);

  const changeActiveNavItem = (title: string) => {
    const newNavItems = navItems.map((item) => {
      if (item.title === title) item.active = true;
      else item.active = false;

      return item;
    });

    setNavItems(newNavItems);
  };

  const toggleStatusTasks = (id: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) task.done = !task.done;
      return task;
    });

    setTasks(newTasks);
  };

  const submitFormHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    const newTask = taskInputRef.current?.value;
    if (newTask) {
      setTasks((prevTasks) => {
        return [
          { title: newTask, done: false, id: generateRandomId() },
          ...prevTasks,
        ];
      });
    }

    if (taskInputRef.current) taskInputRef.current.value = "";
  };

  return (
    <main id={styles.main}>
      <div className={styles.container}>
        <h1>#todo</h1>

        <nav className={styles.nav}>
          <ul>
            {navItems.map((item, idx) => (
              <li
                key={idx}
                className={styles.navItem}
                onClick={() => changeActiveNavItem(item.title)}
              >
                <span>{item.title}</span>
                {item.active && <div className={styles.activeBar}></div>}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.addTask}>
          <form action="#" onSubmit={submitFormHandler}>
            <input type="text" placeholder="add details" ref={taskInputRef} />
            <button type="submit">Add</button>
          </form>
        </div>

        <div className={styles.taskList}>
          <ul>
            {tasks.map((task, idx) => {
              const id = idx.toString();

              return (
                <li key={idx}>
                  <label
                    htmlFor={id}
                    className={`${styles.checkboxWrapper} ${
                      task.done ? styles.done : ""
                    }`}
                  >
                    {task.title}
                    <input
                      type="checkbox"
                      name="task"
                      id={id}
                      checked={task.done}
                      onChange={() => toggleStatusTasks(task.id)}
                    />
                    <span className={styles.checkbox}></span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default App;
