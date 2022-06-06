import React, { FC } from "react";
import { Task } from "../../../../app/model";
import { ReactComponent as Trash } from "../../assets/images/trash.svg";

import styles from "./Checkbox.module.scss";

interface Props {
  id: string;
  task: Task;
  tasks: Array<Task>;
  setTasks: (tasks: Array<Task>) => void;
  toggleStatusTasks: (id: string) => void;
  taskType: string;
}

const CheckboxItem: FC<Props> = (props: Props) => {
  const { id, task, tasks, setTasks, toggleStatusTasks, taskType } = props;

  const deleteTask = (id: string) => {
    console.log(id);
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
  };

  return (
    <li className={styles.taskItem}>
      <label
        htmlFor={id}
        className={`${styles.checkboxWrapper} ${task.done ? styles.done : ""}`}
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
      {taskType === "Completed" && (
        <div onClick={() => deleteTask(task.id)} className={styles.trashBin}>
          <Trash />
        </div>
      )}
    </li>
  );
};

export default CheckboxItem;
