import {  createFileRoute } from "@tanstack/react-router"
import PageLayout from "../layouts/PageLayout"

export const Route = createFileRoute('/_notFound')({ 
    component: notFound,
})  

export function notFound() {
    return<>
        <PageLayout>
            Not found.
            {/* <Outlet /> */}
        </PageLayout>
    </>
}

