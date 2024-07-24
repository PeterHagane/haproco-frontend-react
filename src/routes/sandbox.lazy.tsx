import { Outlet, createLazyFileRoute } from '@tanstack/react-router';
import SandBoxPage from '../pages/SandBoxPage';

export const Route = createLazyFileRoute('/sandbox')({
    component: Dashboard,
})

function Dashboard() {
    return <>
        <SandBoxPage>
            <Outlet/>
        </SandBoxPage>
    </>
}