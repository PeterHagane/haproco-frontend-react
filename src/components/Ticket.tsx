import { usePocket } from "../stores/PocketBaseProvider"
import css from "./Ticket.module.scss"
import cx from "classnames"

const dummytickets = [{
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel nisl eu augue gravida euismod. Cras tempor leo et leo fringilla mollis. Quisque efficitur viverra odio at cursus.",
    sender: "ukjent bruker"
},
{
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel nisl eu augue gravida euismod. Cras tempor leo et leo fringilla mollis. Quisque efficitur viverra odio at cursus.",
    sender: "ukjent bruker"
},
{
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel nisl eu augue gravida euismod. Cras tempor leo et leo fringilla mollis. Quisque efficitur viverra odio at cursus.",
    sender: "ukjent bruker"
}
]

export interface ITicket {
    className?: string
    style?: React.CSSProperties,
    message?: string,
    sender?:string
}

export const Tickets = ({
    // style, 
    className,
}:ITicket) => {
    return <div className={cx(css.tickets, className, "flex column")}>
        {dummytickets.map((ticket, i)=>{
            return <Ticket key={i} message={ticket.message} sender={ticket.sender}/>
        })}
    </div>
}


export const Ticket = ({
    // style, 
    className,
    message,
    sender
}:ITicket) => {
    const { user } = usePocket()

    return <div className={cx(css.ticket, className, "flex column")}>
        <span>message: {message}</span>
        <span>sender: {sender}</span>
        <span>owner: {user?.username || user?.email}</span>
    </div>
}


