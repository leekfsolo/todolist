import React, { Dispatch, FC } from "react";
import { Task } from "../model";

import CheckboxItem from "./CheckboxItem";
import { initTasks, taskAction } from "./reducer";

interface Props {
  taskType: string;
  filteredTasks: Array<Task>;
  setTasks: Dispatch<taskAction>;
}

const CheckboxList: FC<Props> = (props: Props) => {
  const { taskType, filteredTasks = initTasks, setTasks } = props;

  return (
    <ul>
      {filteredTasks.map((task, idx) => {
        const id = idx.toString();

        return (
          <CheckboxItem
            id={id}
            task={task}
            setTasks={setTasks}
            key={idx}
            taskType={taskType}
          />
        );
      })}
    </ul>
  );
};

export default CheckboxList;
