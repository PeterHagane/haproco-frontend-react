// import cx from "classnames"
import { useState } from "react"
import css from "./Chat.module.scss"
import cx from "classnames"

const dummymessages = [{
    text: "Hei!",
    sender: "you"
},
{
    text: "Hallo!",
    sender: "other"
},
{
    text: "Testmelding!",
    sender: "other"
}
]

export interface IChat {
    className?: string
    style?: React.CSSProperties
}

export const Chat = ({
    // style, 
    className,
}:IChat) => {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState(dummymessages)

    return <div className={cx(className, css.chat, "flex column")}>
        {messages.map((message, i)=>{
            return <ChatMessage key={i} message={message.text} className={message.sender=== "you" ? css.you : css.other}></ChatMessage>
        })}

        <div className={cx("flex row marginTopAuto padding-l")}>
            <input onChange={(e)=>{setMessage(e.target.value)}}></input>
            <button
                className={cx("buttonise padding")}
                onClick={()=>{
                    setMessages([...messages, {text: message, sender: "you"}])
                }}
            >send</button>
        </div>
    </div>
}

export default Chat

export interface IChatMessage {
    className?: string
    style?: React.CSSProperties,
    message?: string
}

export const ChatMessage = ({
    // style, 
    className,
    message
}:IChatMessage) => {
    return <div className={cx(css.message, className)}>
        {message}
    </div>
}


