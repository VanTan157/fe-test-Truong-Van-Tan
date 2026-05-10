import { Tag } from "antd";

import { TASK_PRIORITY, type Task, type TaskPriority } from "../../types/task";

const colorMap: Record<TaskPriority, string> = {
  [TASK_PRIORITY.HIGH]: "error",
  [TASK_PRIORITY.MEDIUM]: "warning",
  [TASK_PRIORITY.LOW]: "success",
};

function PriorityTag({ priority }: { priority: Task["priority"] }) {
  return <Tag color={colorMap[priority]}>{priority}</Tag>;
}

export default PriorityTag;
