import cx from "classnames";
import css from "./Login.module.scss"
import { useRef } from "react";
import ModalTabManager from "./ModalTabManager";
import { ILoginForm, usePocket, pb } from "../stores/PocketBaseProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

interface ILogin {
    className?: string
    style?: React.CSSProperties
    onClick?: (param: any) => void,
    children?: React.ReactNode
}

export const loginIds = {
    unid: "username",
    pwid: "password"
}

export const Login = ({
    style,
    className,
    children
}:
    ILogin
) => {
    const formRef = useRef<HTMLFormElement>(null)
    const { register, handleSubmit } = useForm<ILoginForm>()
    const { signIn, signOut, user, isLoading, isError, isSignedIn } = usePocket()
    const navigate = useNavigate()

    const handleSignIn = async (data: ILoginForm) => {
        signIn && signIn({ username: data.username, password: data.password }).then((didSignIn) => {
            !didSignIn && navigate({ to: "/login" })
        })
    }

    const showUser = isSignedIn
    const showForm = !isSignedIn && (!isLoading || isError)
    const showLoader = isLoading && !isError
    const showError = isError

    return <div style={style} className={cx(className)}>
        {!isSignedIn && <>


        </>
        }

        {showUser && <>{`Signed in as ${user?.username ? user?.username : ""} ${pb?.authStore.isAdmin ? "admin" : ""}`}</>}
        {showError && <>Error signing in.</>}
        {showLoader && <div className="loader"></div>}
        {showForm && <ModalTabManager containerRef={formRef}>
            <form onSubmit={handleSubmit(handleSignIn)} ref={formRef} className={cx("flex center column padding-s gap-s", css.container)}>
                <div className="inputContainer">
                    <input {...register("username")} autoFocus className="shadow" type="username" id={loginIds.unid} placeholder="username or email" required></input>
                    <label htmlFor={loginIds.unid}>username or email</label>
                </div>
                <div className="inputContainer">
                    <input  {...register("password")} className="shadow" type="password" id={loginIds.pwid} placeholder="password" required></input>
                    <label htmlFor={loginIds.pwid}>password</label>
                </div>
                <button type="submit" className="defaultButton small submit" value="signin">signin</button>
            </form>
        </ModalTabManager>
        }

        {
            isSignedIn &&
            <button type="submit" className="defaultButton small submit" value="signout" onClick={() => {
                signOut && signOut()
            }}>signout</button>
        }

        {children}
    </div>
}