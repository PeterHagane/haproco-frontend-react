import PocketBase from 'pocketbase';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const url = 'https://haproco.pockethost.io/'
// export const pb = new PocketBase(url)

// export default pb

export interface ILoginForm {
    username: string
    password: string
}

export type PocketSession = {
    registerUser: ({ username, password }: ILoginForm) => Promise<void>
    signIn: ({ username, password }: ILoginForm) => Promise<void>
    signOut: ()=>void
    adminSignIn: ({ username, password }: ILoginForm) => Promise<void>
    user: {
        [key: string]: any;
    } | null
    pb: PocketBase
    isLoading: boolean
    isError: any
}

const PocketContext = createContext<Partial<PocketSession>>({})

export const PocketBaseProvider = ({children}:{children?: React.ReactNode}) =>{
        const pb = useMemo(()=> new PocketBase(url),[])
        const [user, setUser] = useState(pb.authStore.model)
        const [isLoading, setIsLoading] = useState(false)
        const [isError, setIsError] = useState<any>()


        useEffect(()=>{
            return pb.authStore.onChange(model => setUser({model}))
        },[])

        const registerUser = useCallback(async({username, password}:ILoginForm)=>{
            setIsLoading(true)
            return await pb
                .collection("users")
                .create({
                    username, password, passwordConfirm: password
                })
                .then(()=>{
                    setUser(pb.authStore.model)
                    setIsLoading(false)})
        },[])

        const signIn = useCallback(async({username, password}:ILoginForm)=>{
            setIsLoading(true)
            return await pb
                .collection("users")
                .authWithPassword(username, password)
                .then(()=>{
                    setUser(pb.authStore.model)
                    setIsLoading(false)
                }).catch(()=>{
                    setIsLoading(true)
                    adminSignIn({username, password})
                })
        },[])

        const adminSignIn = useCallback(async({username, password}:ILoginForm)=>{
            // setIsLoading(true)
            return await pb
                .admins
                .authWithPassword(username, password)
                .then(()=>{
                    setUser(pb.authStore.model)
                    setIsLoading(false)
                })
                .catch((e)=>{
                    setIsError(e)
                })
                
        },[])

        const signOut = useCallback(()=>{
            pb.authStore.clear()
        },[])

    return <PocketContext.Provider value={{registerUser, signIn, signOut, adminSignIn, isError, isLoading, user, pb}}>
        {children}
    </PocketContext.Provider>
}

export const usePocket =()=> {return useContext(PocketContext)}