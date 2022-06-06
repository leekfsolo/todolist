import React, { FC, SyntheticEvent, useRef } from "react";
import { generateRandomId } from "../../common/utils/helper";

import styles from "../App.module.scss";

interface Props {
  setTasks: (tasks: any) => void;
}

const AddTasksForm: FC<Props> = (props: Props) => {
  const { setTasks } = props;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const taskInputRef = useRef<HTMLInputElement>(null);

  const submitFormHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    const newTask = taskInputRef.current?.value;
    if (newTask) {
      setTasks((prevTasks: any) => {
        return [
          { title: newTask, done: false, id: generateRandomId() },
          ...prevTasks,
        ];
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
