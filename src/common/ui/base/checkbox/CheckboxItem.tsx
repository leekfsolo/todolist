import React, { FC } from "react";
import { Task } from "../../../../app/model";

import styles from "./Checkbox.module.scss";

interface Props {
  id: string;
  task: Task;
  toggleStatusTasks: (id: string) => void;
}

const CheckboxItem: FC<Props> = (props: Props) => {
  const { id, task, toggleStatusTasks } = props;
  return (
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
  );
};

export default CheckboxItem;
