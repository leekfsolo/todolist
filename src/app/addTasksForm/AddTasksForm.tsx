import React, { Dispatch, FC, SyntheticEvent, useRef } from "react";
import { generateRandomId } from "../../common/utils/helper";
import { taskAction, taskActionType } from "../showTasks/reducer";

import styles from "./AddTasksForm.module.scss";

interface Props {
  setTasks: Dispatch<taskAction>;
}

const AddTasksForm: FC<Props> = (props: Props) => {
  const { setTasks } = props;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const taskInputRef = useRef<HTMLInputElement>(null);

  const submitFormHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    const newTask = taskInputRef.current?.value;
    if (newTask) {
      setTasks({
        type: taskActionType.ADD,
        payload: { title: newTask, done: false, id: generateRandomId() },
      });
    }

    if (taskInputRef.current) taskInputRef.current.value = "";
  };

  return (
    <div className={styles.addTask}>
      <form action="#" onSubmit={submitFormHandler}>
        <input type="text" placeholder="add details" ref={taskInputRef} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTasksForm;
