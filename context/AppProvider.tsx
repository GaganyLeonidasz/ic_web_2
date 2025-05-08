"use client";
import Loader from "@/components/Loader";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";


//App provider tipus
interface AppProviderType{
    //login func
    login:(email:string,password:string)=>Promise<void>,
    //register func
    register:(name:string,email:string,password:string,password_confirmation:string)=>Promise<void>,
    //betoltes
    isLoading:boolean,
    //api token
    authToken:string|null,
    //kijelentkezes
    logout:()=>void
}
//context
const AppContext = createContext<AppProviderType|undefined>(undefined)
const API_URL=`${process.env.NEXT_PUBLIC_API_URL}`

//Provider export
export const AppProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [isLoading,setIsLoading] = useState<boolean>(true);
    const [authToken,setAuthToken] = useState<string|null>(null)
    const router = useRouter();

    useEffect(()=>{
        //bekerjuk a cookiebol az api tokent
    const token = Cookies.get("authToken");

    if (token) {
        //ha letezik a token beallitjuk az api tokent
        setAuthToken(token)
    }
    else{
        //ha nem visszakuldjuk a fooldalra
        router.push("/")
    }
    setIsLoading(false)
})
//login func
    const login = async(email:string,password:string)=>{
        setIsLoading(true);
        try{
        //felkuldjuk az adatokat
            const response= await axios.post(`${API_URL}/users/login`,{email,password})
            //ha megfelelo adattot adtunk meg
            if (response.data.status) {
                //beallitjuk az api tokent a cookieba(7nap)
                Cookies.set("authToken",response.data.token,{expires:7})
                toast.success("Login successful")
                setAuthToken(response.data.token)
                //atiranyitjuk a dashboardra
                router.push("/dashboard")
            }
            //ha nem megfelelo
            else{
                toast.error("Invalid login details")
            }
        }
        catch(error){
            
        }
        finally{
            setIsLoading(false);
        }
    }
    //register func
    const register = async(name:string,email:string,password:string,password_confirmation:string)=>{
        try {
            //felkuldjuk az adatokat
            const response = await axios.post(`${API_URL}/users/register`,{
                name,
                email,
                password,
                password_confirmation
            })
        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false);
        }
    }
    //kijelentkezes
    const logout=()=>{
        setAuthToken(null)
        Cookies.remove("authToken")
        setIsLoading(false)
        toast.success("User logged out")
        //visszakuldjuk a fooldalra
        router.push("/")
    }
    return(
        <AppContext.Provider value={{login,register, isLoading,authToken,logout}}>
            {isLoading ? <Loader/>:children}
        </AppContext.Provider>
    )
  }

export const myAppHook = () =>{
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("Context will be wrapped inside AppProvider")
    }
    return context;
}