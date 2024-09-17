import PocketBase from 'pocketbase';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

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
                    return true
                })
                .catch((e)=>{
                    setIsError(e)
                    return false
                    }
                )
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
                    return true
                })
                .catch((e)=>{
                    setIsError(e)
                    setIsLoading(false)
                    return false
                })
                
        },[])

        const signOut = useCallback(()=>{
            pb.authStore.clear()
        },[])

    return <PocketContext.Provider value={{registerUser, signIn, signOut, adminSignIn, isError, isLoading, user, pb, isSignedIn: pb.authStore.isValid, isAdmin: pb.authStore.isAdmin}}>
        {children}
    </PocketContext.Provider>
}

export const usePocket =()=> {return useContext(PocketContext)}