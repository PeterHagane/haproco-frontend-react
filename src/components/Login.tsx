import cx from "classnames";
import css from "./Login.module.scss"
import { useRef, useState } from "react";
import ModalTabManager from "./ModalTabManager";
import { ILoginForm, usePocket} from "../stores/PocketBaseProvider";
// import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import Loader from "./Loader";

interface ILogin {
    className?: string
    style?: React.CSSProperties
    onClick?: (param: any) => void,
    children?: React.ReactNode
}

export const loginIds = {
    userName: "username",
    password: "password"
}

export const Login = ({
    style,
    className,
    children
}:
    ILogin
) => {
    const formRef = useRef<HTMLFormElement>(null)
    // const { register, handleSubmit } = useForm<ILoginForm>()
    const { registerUser, signIn, signOut, user, isLoading, isSignedIn, isAdmin } = usePocket()
    const navigate = useNavigate()

    const [fields, setFields] = useState<ILoginForm>({username: "", password: ""})

    const handleSignIn = async (data: ILoginForm) => {
        signIn && signIn({ username: data.username, password: data.password }).then((didSignIn) => {
            !didSignIn && navigate({ to: "/login" })
        })
    }

    const handleRegister = async (data: ILoginForm) => {
        registerUser && registerUser({ username: data.username, password: data.password }).then((didSignIn) => {
            !didSignIn && navigate({ to: "/login" })
        })
    }

    const showUser = isSignedIn
    const showForm = !isSignedIn
    const showLoader = isLoading
    // const showError = isError

    return <div style={style} className={cx(className, "flex column gap-m nostretch ")}>
        
        {showUser && user?.username && <div>User: {user.username}</div>}
        {showUser && user?.email && <div>Email: {user.email}</div>}
        {isAdmin && <div>Signed in as admin.</div>}
        {/* {showError && <>Error signing in.</>} */}
        {/* {showLoader && <div className="loader"></div>} */}
        {showLoader && <Loader></Loader>}
        {showForm && <ModalTabManager containerRef={formRef}>
            <form 
                onSubmit={(e)=>{e.preventDefault()}}
                ref={formRef} className={cx("flex center column gap-s", css.container)}>
                <div className="inputContainer">
                    <input
                    onChange={(e)=>setFields({...fields, username: e.target.value})}
                    autoFocus className="shadow" type="username" id={loginIds.userName} placeholder="username or email" required></input>
                    <label htmlFor={loginIds.userName}>username or email</label>
                </div>
                <div className="inputContainer">
                    <input  
                    onChange={(e)=>setFields({...fields, password: e.target.value})}
                    className="shadow" type="password" id={loginIds.password} placeholder="password" required></input>
                    <label htmlFor={loginIds.password}>password</label>
                </div>
                <div className={cx("flex center gap-s")}>
                    <button type="submit" onClick={()=>handleSignIn(fields)} className="defaultButton bg small submit padding" value="signin">Sign in</button>
                    <button type="submit" onClick={()=>handleRegister(fields)} className="defaultButton bg small submit padding" value="newuser">Register user</button>
                </div>
            </form>
        </ModalTabManager>
        }

        {
            showUser &&
            <button type="submit" className="defaultButton bg small submit" value="signout" onClick={() => {
                signOut && signOut()
            }}>Sign out</button>
        }

        {children}
    </div>
}