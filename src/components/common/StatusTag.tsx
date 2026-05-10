import { Tag } from "antd";
import { TASK_STATUS, type Task, type TaskStatus } from "../../types/task";

const colorMap: Record<TaskStatus, string> = {
  [TASK_STATUS.TODO]: "default",
  [TASK_STATUS.IN_PROGRESS]: "processing",
  [TASK_STATUS.DONE]: "success",
};

function StatusTag({ status }: { status: Task["status"] }) {
  return <Tag color={colorMap[status]}>{status}</Tag>;
}

export default StatusTag;
