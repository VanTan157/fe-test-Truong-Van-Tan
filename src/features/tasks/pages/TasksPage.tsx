import { Button, Card, Modal, Select, Space, Table } from "antd";

import dayjs from "dayjs";

import { useEffect, useMemo, useState } from "react";

import {
  deleteManyTasks,
  deleteTask,
  setFilter,
  setPage,
  updateTaskStatus,
} from "../tasksSlice";
import { selectFilteredTasks, selectPaginatedTasks } from "../selectors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { Task, TaskStatus } from "../../../types/task";
import TaskModal from "../components/TaskModal";
import TaskFilterBar from "../components/TaskFilterBar";
import PriorityTag from "../../../components/common/PriorityTag";

import { STATUS_OPTIONS } from "../constants";
import EmptyState from "../../../components/common/EmptyState";
import { useSearchParams } from "react-router-dom";

function TasksPage() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectPaginatedTasks);
  const filteredTasks = useAppSelector(selectFilteredTasks);
  const filters = useAppSelector((state) => state.tasks.filters);
  const pagination = useAppSelector((state) => state.tasks.pagination);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(
      setFilter({
        searchText: searchParams.get("search") || "",

        status: searchParams.get("status")
          ? (searchParams.get("status")!.split(",") as TaskStatus[])
          : [],

        priority: (searchParams.get("priority") as Task["priority"]) || null,

        dateRange: [searchParams.get("from"), searchParams.get("to")],
      }),
    );

    dispatch(setPage(Number(searchParams.get("page")) || 1));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.searchText) {
      params.set("search", filters.searchText);
    }

    if (filters.status.length > 0) {
      params.set("status", filters.status.join(","));
    }

    if (filters.priority) {
      params.set("priority", filters.priority);
    }

    if (filters.dateRange[0]) {
      params.set("from", filters.dateRange[0]);
    }

    if (filters.dateRange[1]) {
      params.set("to", filters.dateRange[1]);
    }

    if (pagination.currentPage > 1) {
      params.set("page", String(pagination.currentPage));
    }

    setSearchParams(params);
  }, [filters, pagination.currentPage, setSearchParams]);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete task?",
      content: "This action cannot be undone.",

      onOk: () => {
        dispatch(deleteTask(id));
      },
    });
  };

  const columns = useMemo(
    () => [
      {
        title: "Title",
        dataIndex: "title",

        sorter: (a: Task, b: Task) => a.title.localeCompare(b.title),
      },

      {
        title: "Status",

        render: (_: unknown, task: Task) => (
          <Select
            value={task.status}
            className="min-w-[140px]"
            options={STATUS_OPTIONS}
            onChange={(value) =>
              dispatch(
                updateTaskStatus({
                  id: task.id,
                  status: value,
                }),
              )
            }
          />
        ),
      },

      {
        title: "Priority",
        dataIndex: "priority",

        sorter: (a: Task, b: Task) => a.priority.localeCompare(b.priority),

        render: (priority: Task["priority"]) => (
          <PriorityTag priority={priority} />
        ),
      },

      {
        title: "Assignee",
        dataIndex: "assignee",
      },

      {
        title: "Due Date",
        dataIndex: "dueDate",

        sorter: (a: Task, b: Task) =>
          dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix(),

        render: (dueDate?: string) =>
          dueDate ? dayjs(dueDate).format("DD/MM/YYYY") : "-",
      },

      {
        title: "Actions",

        render: (_: unknown, task: Task) => (
          <Space>
            <Button
              onClick={() => {
                setEditingTask(task);
                setOpenModal(true);
              }}
            >
              Edit
            </Button>

            <Button danger onClick={() => handleDelete(task.id)}>
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    [dispatch],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Tasks</h1>

          <p className="text-gray-500 dark:text-gray-400">Manage your tasks</p>
        </div>

        <Button
          type="primary"
          onClick={() => {
            setEditingTask(null);
            setOpenModal(true);
          }}
        >
          Add Task
        </Button>
      </div>

      <Card>
        <div className="space-y-4">
          <TaskFilterBar />

          {selectedRowKeys.length > 0 && (
            <Button
              danger
              onClick={() =>
                dispatch(deleteManyTasks(selectedRowKeys as string[]))
              }
              className="ml-3"
            >
              Delete Selected ({selectedRowKeys.length})
            </Button>
          )}

          <Table
            rowKey="id"
            dataSource={tasks}
            columns={columns}
            locale={{
              emptyText: <EmptyState />,
            }}
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
            }}
            pagination={{
              current: pagination.currentPage,
              pageSize: pagination.pageSize,
              total: filteredTasks.length,
              showTotal: (total) => `Total ${total} items`,
              onChange: (page) => dispatch(setPage(page)),
            }}
          />
        </div>
      </Card>

      <TaskModal
        open={openModal}
        editingTask={editingTask}
        onClose={() => {
          setOpenModal(false);
          setEditingTask(null);
        }}
      />
    </div>
  );
}

export default TasksPage;
