import React, { FC, useEffect, useReducer, useState } from "react";

import { generateRandomId } from "../../common/utils/helper";
import AddTasksForm from "../addTasksForm";
import { Task } from "../model";
import { ReactComponent as Trash } from "../../common/ui/assets/images/trash.svg";

import styles from "../App.module.scss";
import CheckboxList from "./CheckboxList";

export enum taskActionType {
  GET = "GET",
  ADD = "ADD",
  TOGGLE = "TOGGLE",
  DELETE = "DELETE",
  DELETECOMPLETED = "DELETECOMPLETED",
}
export interface taskAction {
  type: taskActionType;
  payload?: Task;
  storage?: Array<Task>;
}
interface Props {
  taskType: string;
}

export const initTasks = [
  { title: "Do coding challenges", done: false, id: generateRandomId() },
  { title: "Playing games", done: false, id: generateRandomId() },
  { title: "Reading books", done: true, id: generateRandomId() },
];

const ShowTasks: FC<Props> = (props: Props) => {
  const { taskType } = props;

  // const [tasks, setTasks] = useState<Array<Task>>(initTasks);
  const [filteredTasks, setFilteredTasks] = useState<Array<Task>>(initTasks);

  const taskReducer = (state: Array<Task>, action: taskAction) => {
    const {
      type,
      payload = {
        title: "Do coding challenges",
        done: false,
        id: generateRandomId(),
      },
      storage = initTasks,
    } = action;
    switch (type) {
      case taskActionType.GET:
        return storage;

      case taskActionType.ADD:
        const newTasks = [payload, ...state];
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        return newTasks;

      case taskActionType.TOGGLE:
        const toggleTasks = state.map((task) => {
          if (task.id === payload.id) task.done = !task.done;
          return task;
        });
        localStorage.setItem("tasks", JSON.stringify(toggleTasks));
        return toggleTasks;

      case taskActionType.DELETE:
        const deleteTasks = state.filter((task) => task.id !== payload.id);
        localStorage.setItem("tasks", JSON.stringify(deleteTasks));
        return deleteTasks;

      case taskActionType.DELETECOMPLETED:
        const deleteCompletedTasks = state.filter((task) => !task.done);
        localStorage.setItem("tasks", JSON.stringify(deleteCompletedTasks));
        return deleteCompletedTasks;

      default:
        return initTasks;
    }
  };
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
