import React, { SyntheticEvent, useEffect, useRef, useState } from "react";

import CheckboxList from "../common/ui/base/checkbox/CheckboxList";
import MainLayout from "../common/ui/layout/main-layout";
import { generateRandomId } from "../common/utils/helper";
import AddTasksForm from "./addTasksForm";

import styles from "./App.module.scss";
import { NavItem, Task } from "./model";

const App = () => {
  const [navItems, setNavItems] = useState<Array<NavItem>>([
    {
      title: "All",
      active: true,
    },
    { title: "Active", active: false },
    { title: "Completed", active: false },
  ]);
  const [tasks, setTasks] = useState<Array<Task>>([
    { title: "Do coding challenges", done: false, id: generateRandomId() },
    { title: "Do coding challenges", done: false, id: generateRandomId() },
    { title: "Do coding challenges", done: true, id: generateRandomId() },
  ]);

  const changeActiveNavItem = (title: string) => {
    const newNavItems = navItems.map((item) => {
      if (item.title === title) item.active = true;
      else item.active = false;

      return item;
    });

    setNavItems(newNavItems);
    showTaskList(title);
  };

  const showTaskList = (type: string) => {
    const jsonValue = localStorage.getItem("tasks");
    let taskList = tasks;

    if (jsonValue) taskList = JSON.parse(jsonValue);
    if (type === "Active") {
      taskList = taskList.filter((task) => !task.done);
    }

    if (type === "Completed") {
      taskList = taskList.filter((task) => task.done);
    }

    setTasks(taskList);
  };

  useEffect(() => {
    const activeNavItem = navItems.filter((item) => item.active)[0];
    if (activeNavItem.title === "All") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [navItems, tasks]);

  return (
    <MainLayout>
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

      <AddTasksForm setTasks={setTasks} />

      <CheckboxList tasks={tasks} setTasks={setTasks} />
    </MainLayout>
  );
};

export default App;
