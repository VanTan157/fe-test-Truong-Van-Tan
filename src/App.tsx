import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center">
        <div className="text-white text-xl font-bold mr-10">TaskBoard</div>

        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            {
              key: "dashboard",
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "tasks",
              label: <Link to="/tasks">Tasks</Link>,
            },
          ]}
        />
      </Header>

      <Content className="p-6">
        <Outlet />
      </Content>
    </Layout>
  );
}

export default App;
