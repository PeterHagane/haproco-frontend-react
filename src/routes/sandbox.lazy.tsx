import { Outlet, createLazyFileRoute } from '@tanstack/react-router';
import SandBoxPage from '../pages/SandBoxPage';
import { usePocket } from '../stores/PocketBaseProvider';

export const Route = createLazyFileRoute('/sandbox')({
    component: SandBox,
})

function SandBox() {
    const {isAdmin} = usePocket()

    if(!isAdmin){
        return <div style={{marginTop: "48px"}}>No access.</div>
    }

    return <>
        <SandBoxPage>
            <Outlet/>
        </SandBoxPage>
    </>
}