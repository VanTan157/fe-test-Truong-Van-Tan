import { Button, Card, Modal, Select, Space, Table } from "antd";

import dayjs from "dayjs";

import { useMemo, useState } from "react";

import {
  deleteManyTasks,
  deleteTask,
  setPage,
  updateTaskStatus,
} from "../tasksSlice";
import { selectFilteredTasks, selectPaginatedTasks } from "../selectors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { Task } from "../../../types/task";
import TaskModal from "../components/TaskModal";
import TaskFilterBar from "../components/TaskFilterBar";
import PriorityTag from "../../../components/common/PriorityTag";

import { STATUS_OPTIONS } from "../constants";

function TasksPage() {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(selectPaginatedTasks);

  const filteredTasks = useAppSelector(selectFilteredTasks);

  const pagination = useAppSelector((state) => state.tasks.pagination);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [openModal, setOpenModal] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

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
          <h1 className="text-3xl font-bold">Tasks</h1>

          <p className="text-gray-500">Manage your tasks</p>
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
              emptyText: "No tasks found",
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
