import React, { FC } from "react";
import { Task } from "../../../../app/model";

import styles from "./Checkbox.module.scss";
import CheckboxItem from "./CheckboxItem";

interface Props {
  tasks: Array<Task>;
  setTasks: (tasks: Array<Task>) => void;
}

const CheckboxList: FC<Props> = (props: Props) => {
  const { tasks, setTasks } = props;

  const toggleStatusTasks = (id: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) task.done = !task.done;
      return task;
    });

    setTasks(newTasks);
  };

  return (
    <div className={styles.taskList}>
      <ul>
        {tasks.map((task, idx) => {
          const id = idx.toString();

          return (
            <li key={idx}>
              <CheckboxItem
                id={id}
                task={task}
                toggleStatusTasks={toggleStatusTasks}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CheckboxList;
