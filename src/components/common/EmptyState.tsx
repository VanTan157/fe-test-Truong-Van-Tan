import { Empty } from "antd";

function EmptyState() {
  return (
    <div className="py-10">
      <Empty description="No tasks found" />
    </div>
  );
}

export default EmptyState;
