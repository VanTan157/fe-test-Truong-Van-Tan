import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import TasksPage from "../../features/tasks/pages/TasksPage";

export const PATHS = {
  DASHBOARD: "/",
  TASKS: "/tasks",
};

export const router = createBrowserRouter([
  {
    path: PATHS.DASHBOARD,
    element: <App />,

    children: [
      {
        path: PATHS.DASHBOARD,
        element: <div>Dashboard</div>,
      },

      {
        path: PATHS.TASKS,
        element: <TasksPage />,
      },
    ],
  },
]);
