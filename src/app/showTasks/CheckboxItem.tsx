import React, { Dispatch, FC } from "react";
import { Task } from "../model";
import { ReactComponent as Trash } from "../../common/ui/assets/images/trash.svg";

import styles from "./ShowTasks.module.scss";
import { taskAction, taskActionType } from "./reducer";

interface Props {
  id: string;
  task: Task;
  setTasks: Dispatch<taskAction>;
  taskType: string;
}

const CheckboxItem: FC<Props> = (props: Props) => {
  const { id, task, setTasks, taskType } = props;

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
          onChange={() =>
            setTasks({ type: taskActionType.TOGGLE, payload: task })
          }
        />
        <span className={styles.checkbox}></span>
      </label>
      {taskType === "Completed" && (
        <div
          onClick={() =>
            setTasks({ type: taskActionType.DELETE, payload: task })
          }
          className={styles.trashBin}
        >
          <Trash />
        </div>
      )}
    </li>
  );
};

export default CheckboxItem;
