import { Layout } from "antd";
import { Link, Outlet } from "react-router-dom";
import { PATHS } from "./app/router";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center">
        <div className="text-white text-xl font-bold mr-10">TaskBoard</div>
        <Link to={PATHS.DASHBOARD} className="text-white mr-4">
          Dashboard
        </Link>
        <Link to={PATHS.TASKS} className="text-white">
          Tasks
        </Link>
      </Header>

      <Content className="p-6">
        <Outlet />
      </Content>
    </Layout>
  );
}

export default App;
