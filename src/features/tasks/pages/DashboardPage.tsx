import { Card, Col, Progress, Row, Statistic, Table } from "antd";

import { useAppSelector } from "../../../store/hooks";

import { selectAllTasks, selectTaskStats } from "../selectors";
import StatusTag from "../../../components/common/StatusTag";
import type { TaskPriority, TaskStatus } from "../../../types/task";
import PriorityTag from "../../../components/common/PriorityTag";
import EmptyState from "../../../components/common/EmptyState";

function DashboardPage() {
  const stats = useAppSelector(selectTaskStats);

  const tasks = useAppSelector(selectAllTasks);

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const completionPercent =
    stats.total === 0 ? 0 : Math.round((stats.done / stats.total) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-gray-500">Task management overview</p>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Total Tasks" value={stats.total} />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Todo" value={stats.todo} />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="In Progress" value={stats.inProgress} />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Done" value={stats.done} />
          </Card>
        </Col>
      </Row>

      {/* Progress */}
      <Card title="Task Completion">
        <div className="max-w-xl">
          <Progress percent={completionPercent} status="active" />

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Todo</p>

              <p className="font-semibold">{stats.todo}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">In Progress</p>

              <p className="font-semibold">{stats.inProgress}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Done</p>

              <p className="font-semibold">{stats.done}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent tasks */}
      <Card title="Recent Tasks">
        <Table
          rowKey="id"
          pagination={false}
          dataSource={recentTasks}
          locale={{
            emptyText: <EmptyState />,
          }}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },

            {
              title: "Status",
              dataIndex: "status",

              render: (status: TaskStatus) => <StatusTag status={status} />,
            },

            {
              title: "Priority",
              dataIndex: "priority",

              render: (priority: TaskPriority) => (
                <PriorityTag priority={priority} />
              ),
            },

            {
              title: "Assignee",
              dataIndex: "assignee",
            },
          ]}
        />
      </Card>
    </div>
  );
}

export default DashboardPage;
