import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import type { Task } from "../../../types/task";
import { addTask, updateTask } from "../tasksSlice";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../constants";

interface Props {
  open: boolean;
  onClose: () => void;
  editingTask?: Task | null;
}

function TaskModal({ open, onClose, editingTask }: Props) {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        ...editingTask,
        dueDate: editingTask.dueDate ? dayjs(editingTask.dueDate) : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [editingTask, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    const payload: Task = {
      id: editingTask?.id || uuidv4(),
      createdAt: editingTask?.createdAt || new Date().toISOString(),

      ...values,

      dueDate: values.dueDate ? values.dueDate.toISOString() : undefined,
    };

    if (editingTask) {
      dispatch(updateTask(payload));
    } else {
      dispatch(addTask(payload));
    }

    onClose();
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      title={editingTask ? "Edit Task" : "Add Task"}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter title",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={STATUS_OPTIONS} />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={PRIORITY_OPTIONS} />
        </Form.Item>

        <Form.Item label="Assignee" name="assignee">
          <Input />
        </Form.Item>

        <Form.Item label="Due Date" name="dueDate">
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select mode="tags" />
        </Form.Item>

        <Button type="primary" block onClick={handleSubmit}>
          Save
        </Button>
      </Form>
    </Modal>
  );
}

export default TaskModal;
