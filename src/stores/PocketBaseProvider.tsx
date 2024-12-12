import PocketBase from 'pocketbase';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { notify } from '../components/Toast';

const url = 'https://haproco.pockethost.io/'
export const pb = new PocketBase(url)


export interface ILoginForm {
    username: string
    password: string
}

export type PocketSession = {
    registerUser: ({ username, password }: ILoginForm)  => Promise<boolean | void>
    signIn: ({ username, password }: ILoginForm) => Promise<boolean | void>
    signOut: ()=>void
    adminSignIn: ({ username, password }: ILoginForm) => Promise<boolean | void>
    user: {
        [key: string]: any;
    } | null
    pb: PocketBase
    isLoading: boolean
    isError: any
    isSignedIn: boolean
    isAdmin: boolean
}

const PocketContext = createContext<Partial<PocketSession>>({})

export const PocketBaseProvider = ({children}:{children?: React.ReactNode}) =>{
        // const pb = useMemo(()=> new PocketBase(url),[])
        // const pb = useMemo(()=> pocketBase,[])
        const [user, setUser] = useState(pb.authStore.model)
        const [isLoading, setIsLoading] = useState(false)
        const [isError, setIsError] = useState<any>()

        useEffect(()=>{
            return pb.authStore.onChange(model => setUser({model}))
        },[])

        const registerUser = useCallback(async({username, password}:ILoginForm)=>{
            setIsError(null)
            setIsLoading(true)
            return await pb
                .collection("users")
                .create({
                    username, password, passwordConfirm: password
                })
                .then(()=>{
                    setUser(pb.authStore.model)
                    setIsLoading(false)
                    notify({title: `User registered, signing in...` , color: "var(--good)", duration: 6000})
                    return true
                }).catch((e)=>{
                    console.log(e)
                    setIsError(e)
                    setIsLoading(false)
                    notify({title: `Couldn't register user.` , color: "var(--danger)", message: e.toString(), duration: 10000, dismissible: true })
                    return false
                    }
                ).then(()=>{
                    signIn({username, password})
                })
        },[])

        const signIn = useCallback(async({username, password}:ILoginForm)=>{
            setIsError(null)
            setIsLoading(true)
            return await pb
                .collection("users")
                .authWithPassword(username, password)
                .then(()=>{
                    setUser(pb.authStore.model)
                    setIsLoading(false)
                    notify({title: `Signed in. Welcome, ${username}` , color: "var(--good)", duration: 6000})
                    return true
                }).catch(()=>{
                    setIsLoading(true)
                    adminSignIn({username, password})
                })
        },[])

        const adminSignIn = useCallback(async({username, password}:ILoginForm)=>{
            setIsError(null)
            setIsLoading(true)
            return await pb
                .admins
                .authWithPassword(username, password)
                .then(()=>{
                    setUser(pb.authStore.model)
                    setIsLoading(false)
                    notify({title: `Signed in. Welcome, ${username}` , color: "var(--good)", duration: 6000})
                    return true
                })
                .catch((e)=>{
                    setIsError(e)
                    setIsLoading(false)
                    notify({title: `Couldn't sign in user.` , color: "var(--danger)", message: e.toString(), duration: 10000, dismissible: true})
                    return false
                })
                
        },[])

        const signOut = useCallback(()=>{
            pb.authStore.clear()
            notify({title: `Signed out.` , color: "var(--good)", duration: 6000})
        },[])

    return <PocketContext.Provider value={{registerUser, signIn, signOut, adminSignIn, isError, isLoading, user, pb, isSignedIn: pb.authStore.isValid, isAdmin: pb.authStore.isAdmin}}>
        {children}
    </PocketContext.Provider>
}

export const usePocket =()=> {return useContext(PocketContext)}