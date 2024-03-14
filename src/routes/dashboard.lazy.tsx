import { Outlet, createLazyFileRoute } from '@tanstack/react-router';
// import cx from "classnames"
import DashboardPage from '../pages/DashboardPage';

export const Route = createLazyFileRoute('/dashboard')({
    component: Dashboard,
})

function Dashboard() {
    return <>
        <DashboardPage>
            <Outlet/>
        </DashboardPage>
    </>
}