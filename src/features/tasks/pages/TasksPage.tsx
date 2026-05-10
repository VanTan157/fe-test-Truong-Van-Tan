import { useAppSelector } from "../../../store/hooks";
import { selectAllTasks, selectTaskStats } from "../selectors";

function TasksPage() {
  const stats = useAppSelector(selectTaskStats);
  const allTasks = useAppSelector(selectAllTasks);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks Page</h1>

      <pre>{JSON.stringify(stats, null, 2)}</pre>
      <pre>{JSON.stringify(allTasks, null, 2)}</pre>
    </div>
  );
}

export default TasksPage;
