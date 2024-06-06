import {  createLazyFileRoute } from '@tanstack/react-router';
// import cx from "classnames"
// import DashboardPage from '../pages/DashboardPage';

export const Route = createLazyFileRoute('/dashboard/user')({
    component: User,
})

function User() {
    return <>
        <>
            |
            <br/>
            <br/>

            |        </>
    </>
}