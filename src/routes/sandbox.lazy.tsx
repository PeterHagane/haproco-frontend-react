import { Outlet, createLazyFileRoute } from '@tanstack/react-router';
import SandBoxPage from '../pages/SandBoxPage';
import { usePocket } from '../stores/PocketBaseProvider';

export const Route = createLazyFileRoute('/sandbox')({
    component: SandBox,
})

function SandBox() {
    const {pb} = usePocket()

    if(!pb?.authStore.isAdmin){
        return <>No access.</>
    }

    return <>
        <SandBoxPage>
            <Outlet/>
        </SandBoxPage>
    </>
}