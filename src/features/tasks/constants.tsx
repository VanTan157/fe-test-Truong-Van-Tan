import PriorityTag from "../../components/common/PriorityTag";
import StatusTag from "../../components/common/StatusTag";
import { TASK_PRIORITY, TASK_STATUS } from "../../types/task";

export const STATUS_OPTIONS = [
  {
    value: TASK_STATUS.TODO,
    label: <StatusTag status={TASK_STATUS.TODO} />,
  },
  {
    value: TASK_STATUS.IN_PROGRESS,
    label: <StatusTag status={TASK_STATUS.IN_PROGRESS} />,
  },
  {
    value: TASK_STATUS.DONE,
    label: <StatusTag status={TASK_STATUS.DONE} />,
  },
];

export const PRIORITY_OPTIONS = [
  {
    value: TASK_PRIORITY.LOW,
    label: <PriorityTag priority={TASK_PRIORITY.LOW} />,
  },
  {
    value: TASK_PRIORITY.MEDIUM,
    label: <PriorityTag priority={TASK_PRIORITY.MEDIUM} />,
  },
  {
    value: TASK_PRIORITY.HIGH,
    label: <PriorityTag priority={TASK_PRIORITY.HIGH} />,
  },
];
