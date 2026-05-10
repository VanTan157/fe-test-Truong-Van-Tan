import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PaginationState, Task, TaskFilters } from "../../types/task";
import { mockTasks } from "./mockData";

interface TasksState {
  items: Task[];
  filters: TaskFilters;
  pagination: PaginationState;
}

const initialState: TasksState = {
  items: mockTasks,

  filters: {
    searchText: "",
    status: [],
    priority: null,
    dateRange: [null, null],
  },

  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.unshift(action.payload);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id,
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },

    deleteManyTasks: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter(
        (task) => !action.payload.includes(task.id),
      );
    },

    updateTaskStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: Task["status"];
      }>,
    ) => {
      const task = state.items.find((item) => item.id === action.payload.id);

      if (task) {
        task.status = action.payload.status;
      }
    },

    setFilter: (state, action: PayloadAction<Partial<TaskFilters>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };

      state.pagination.currentPage = 1;
    },

    resetFilters: (state) => {
      state.filters = {
        searchText: "",
        status: [],
        priority: null,
        dateRange: [null, null],
      };
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  deleteManyTasks,
  updateTaskStatus,
  setFilter,
  resetFilters,
  setPage,
} = tasksSlice.actions;

export default tasksSlice.reducer;
