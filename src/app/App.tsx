import React, { useState } from "react";

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
    { title: "Do coding Challenges", done: false },
    { title: "Do coding Challenges", done: false },
    { title: "Do coding Challenges", done: false },
  ]);

  const changeActiveNavItem = (title: string) => {
    const newNavItems = navItems.map((item) => {
      if (item.title === title) item.active = true;
      else item.active = false;

      return item;
    });

    setNavItems(newNavItems);
  };

  return (
    <main>
      <h1>#todo</h1>

      <nav>
        <ul>
          {navItems.map((item, idx) => (
            <li
              key={idx}
              className={`${styles.navItem} ${
                item.active ? styles.active : ""
              }`}
              onClick={() => changeActiveNavItem(item.title)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <form action="#">
          <input type="text" placeholder="add details" />
          <button type="submit">Add</button>
        </form>
      </div>

      <div>
        <ul>
          {tasks.map((task, idx) => {
            const id = idx.toString();

            return (
              <li key={idx}>
                <input
                  type="checkbox"
                  name="task"
                  id={id}
                  checked={task.done}
                />
                <label htmlFor={id}>{task.title}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default App;
