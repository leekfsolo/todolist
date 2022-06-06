import React, { FC, useEffect, useReducer, useState } from "react";

import AddTasksForm from "../addTasksForm";
import { Task } from "../model";
import { ReactComponent as Trash } from "../../common/ui/assets/images/trash.svg";

import styles from "../App.module.scss";
import CheckboxList from "./CheckboxList";
import { initTasks, taskActionType, taskReducer } from "./reducer";

interface Props {
  taskType: string;
}

const ShowTasks: FC<Props> = (props: Props) => {
  const { taskType } = props;

  const [filteredTasks, setFilteredTasks] = useState<Array<Task>>(initTasks);
  const [tasks, setTasks] = useReducer(taskReducer, initTasks);

  useEffect(() => {
    if (taskType === "All") setFilteredTasks(tasks);
    if (taskType === "Active")
      setFilteredTasks(tasks.filter((task) => !task.done));

    if (taskType === "Completed")
      setFilteredTasks(tasks.filter((task) => task.done));
  }, [taskType, tasks]);

  useEffect(() => {
    const jsonTasksValue = localStorage.getItem("tasks");

    if (jsonTasksValue)
      setTasks({
        type: taskActionType.GET,
        storage: JSON.parse(jsonTasksValue),
      });
  }, []);

  return (
    <div className={styles.taskList}>
      {taskType === "Completed" ? (
        <>
          <CheckboxList
            filteredTasks={filteredTasks}
            taskType={taskType}
            setTasks={setTasks}
          />
          {tasks.some((task) => task.done) && (
            <button
              className={styles.deleteBtn}
              onClick={() => setTasks({ type: taskActionType.DELETECOMPLETED })}
            >
              <span>
                <Trash /> Delete All
              </span>
            </button>
          )}
        </>
      ) : (
        <>
          <AddTasksForm setTasks={setTasks} />

          <CheckboxList
            filteredTasks={filteredTasks}
            taskType={taskType}
            setTasks={setTasks}
          />
        </>
      )}
    </div>
  );
};

export default ShowTasks;
