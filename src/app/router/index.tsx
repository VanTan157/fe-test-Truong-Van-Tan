import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import TasksPage from "../../features/tasks/pages/TasksPage";
import DashboardPage from "../../features/tasks/pages/DashboardPage";

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
        index: true,
        element: <DashboardPage />,
      },
      {
        path: PATHS.TASKS,
        element: <TasksPage />,
      },
    ],
  },
]);
