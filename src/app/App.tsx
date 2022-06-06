import React, { useEffect, useState } from "react";

import MainLayout from "../common/ui/layout/main-layout";
import { NavItem } from "./model";
import ShowTasks from "./showTasks";

import styles from "./App.module.scss";

const App = () => {
  const [navItems, setNavItems] = useState<Array<NavItem>>([
    {
      title: "All",
      active: true,
    },
    { title: "Active", active: false },
    { title: "Completed", active: false },
  ]);

  const [taskType, setTaskType] = useState<string>("All");

  const changeActiveNavItem = (title: string) => {
    const newNavItems = navItems.map((item) => {
      if (item.title === title) item.active = true;
      else item.active = false;

      return item;
    });

    setNavItems(newNavItems);
  };

  useEffect(() => {
    const activeNavItem = navItems.filter((item) => item.active)[0];
    setTaskType(activeNavItem.title);
  }, [navItems]);

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

      <ShowTasks taskType={taskType} />
    </MainLayout>
  );
};

export default App;
