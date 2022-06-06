import React, { FC } from "react";
import { Task } from "../../../../app/model";

import CheckboxItem from "./CheckboxItem";

interface Props {
  taskType: string;
  filteredTasks: Array<Task>;
  tasks: Array<Task>;
  setTasks: (tasks: Array<Task>) => void;
}

const CheckboxList: FC<Props> = (props: Props) => {
  const { taskType, filteredTasks, tasks, setTasks } = props;

  const toggleStatusTasks = (id: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) task.done = !task.done;
      return task;
    });

    setTasks(newTasks);
  };

  return (
    <ul>
      {filteredTasks.map((task, idx) => {
        const id = idx.toString();

        return (
          <CheckboxItem
            id={id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            toggleStatusTasks={toggleStatusTasks}
            key={idx}
            taskType={taskType}
          />
        );
      })}
    </ul>
  );
};

export default CheckboxList;
