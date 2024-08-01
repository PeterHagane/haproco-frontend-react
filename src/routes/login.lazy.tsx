import { Outlet, createLazyFileRoute } from '@tanstack/react-router';
import LoginPage from '../pages/LoginPage';

export const Route = createLazyFileRoute('/login')({
    component: Dashboard,
})

function Dashboard() {
    return <>
        <LoginPage>
            <Outlet/>
        </LoginPage>
    </>
}