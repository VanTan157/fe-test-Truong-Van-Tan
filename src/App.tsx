import { Layout, Switch } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { PATHS } from './app/router';
import { useTheme } from './app/theme/use-theme';

const { Header, Content } = Layout;

function App() {
    const { mode, setMode } = useTheme();

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

                <div className="ml-auto">
                    <Switch
                        checked={mode === 'dark'}
                        onChange={(checked) => setMode(checked ? 'dark' : 'light')}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                        aria-label="Toggle dark mode"
                    />
                </div>
            </Header>

            <Content className="p-6">
                <Outlet />
            </Content>
        </Layout>
    );
}

export default App;
