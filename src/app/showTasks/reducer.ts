import { generateRandomId } from "../../common/utils/helper";
import { Task } from "../model";

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

export const initTasks = [
  { title: "Do coding challenges", done: false, id: generateRandomId() },
  { title: "Playing games", done: false, id: generateRandomId() },
  { title: "Reading books", done: true, id: generateRandomId() },
];

export const taskReducer = (state: Array<Task>, action: taskAction) => {
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
