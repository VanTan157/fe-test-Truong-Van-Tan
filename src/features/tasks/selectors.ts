import { createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import type { RootState } from "../../store/store";
import { TASK_STATUS } from "../../types/task";

export const selectTasksState = (state: RootState) => state.tasks;

export const selectAllTasks = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.items,
);

export const selectFilteredTasks = createSelector(
  [selectTasksState],
  (tasksState) => {
    const { items, filters } = tasksState;

    return items.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(filters.searchText.toLowerCase());

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(task.status);

      const matchesPriority =
        !filters.priority || task.priority === filters.priority;

      const matchesDate =
        !filters.dateRange[0] ||
        !filters.dateRange[1] ||
        (task.dueDate &&
          dayjs(task.dueDate).isAfter(filters.dateRange[0]) &&
          dayjs(task.dueDate).isBefore(filters.dateRange[1]));

      return matchesSearch && matchesStatus && matchesPriority && matchesDate;
    });
  },
);

export const selectPaginatedTasks = createSelector(
  [selectFilteredTasks, selectTasksState],
  (filteredTasks, tasksState) => {
    const { currentPage, pageSize } = tasksState.pagination;

    const startIndex = (currentPage - 1) * pageSize;

    return filteredTasks.slice(startIndex, startIndex + pageSize);
  },
);

export const selectTaskStats = createSelector([selectAllTasks], (tasks) => ({
  total: tasks.length,

  todo: tasks.filter((task) => task.status === TASK_STATUS.TODO).length,

  inProgress: tasks.filter((task) => task.status === TASK_STATUS.IN_PROGRESS)
    .length,

  done: tasks.filter((task) => task.status === TASK_STATUS.DONE).length,
}));
