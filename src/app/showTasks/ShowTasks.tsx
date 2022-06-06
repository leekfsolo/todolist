import React, { FC, useEffect, useState } from "react";

import { generateRandomId } from "../../common/utils/helper";
import AddTasksForm from "../addTasksForm";
import { Task } from "../model";
import { ReactComponent as Trash } from "../../common/ui/assets/images/trash.svg";

import styles from "../App.module.scss";
import CheckboxList from "../../common/ui/base/checkbox/CheckboxList";

interface Props {
  taskType: string;
}

const ShowTasks: FC<Props> = (props: Props) => {
  const { taskType } = props;

  const [tasks, setTasks] = useState<Array<Task>>([
    { title: "Do coding challenges", done: false, id: generateRandomId() },
    { title: "Playing games", done: false, id: generateRandomId() },
    { title: "Reading books", done: true, id: generateRandomId() },
  ]);

  const [filteredTasks, setFilteredTasks] = useState<Array<Task>>(tasks);

  const deleteAllCompletedTasks = () => {
    const newTasks = tasks.filter((task) => !task.done);

    setTasks(newTasks);
  };

  useEffect(() => {
    if (taskType === "All") setFilteredTasks(tasks);
    if (taskType === "Active")
      setFilteredTasks(tasks.filter((task) => !task.done));

    if (taskType === "Completed")
      setFilteredTasks(tasks.filter((task) => task.done));
  }, [taskType, tasks]);

  return (
    <div className={styles.taskList}>
      {taskType === "Completed" ? (
        <>
          <CheckboxList
            filteredTasks={filteredTasks}
            taskType={taskType}
            tasks={tasks}
            setTasks={setTasks}
          />
          {tasks.some((task) => task.done) && (
            <button
              className={styles.deleteBtn}
              onClick={() => deleteAllCompletedTasks()}
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
            tasks={tasks}
            setTasks={setTasks}
          />
        </>
      )}
    </div>
  );
};

export default ShowTasks;
