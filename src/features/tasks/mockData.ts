import { v4 as uuidv4 } from "uuid";
import type { Task } from "../../types/task";

export const mockTasks: Task[] = Array.from({ length: 20 }, (_, index) => ({
  id: uuidv4(),
  title: `Task ${index + 1}`,
  description: `Description for task ${index + 1}`,
  status: index % 3 === 0 ? "todo" : index % 3 === 1 ? "in_progress" : "done",
  priority: index % 3 === 0 ? "high" : index % 3 === 1 ? "medium" : "low",
  assignee: `User ${index + 1}`,
  dueDate: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
  tags: ["frontend", "react"],
}));
