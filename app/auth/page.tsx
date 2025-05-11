"use client"

import React, { useEffect, useState } from "react";
import { myAppHook } from "@/context/AppProvider";
import {useRouter} from "next/navigation";

//form adat tipus
interface formData {
    name?:string,
    email:string,
    password:string,
    password_confirmation?:string
}

const Auth: React.FC = () => {

    //bevan e jelentketve
    const [isLogin,setIsLogin] = useState<boolean>(true)
    //form data
    const [formdata,setFormData]=useState<formData>({
        name:"",
        email:"",
        password:"",
        password_confirmation:""
    })
    //iranyito
    const router = useRouter();
    //hook letrehozasa
    const {login,register,authToken,isLoading} = myAppHook()
    useEffect(()=>{
        //ha be van jelentkezve -> dashboard
        if (authToken) {
            router.push("/dashboard")
            return
        }
    },[authToken,isLoading])
    //adat beadas eseten
    const handleOnChangeInput = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            //beallitja az adatokat
            ...formdata,
            [event.target.name]:event.target.value
        })
    }
    //Lekezeli a form bekuldeset
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        //ha letezik a fiok
        if (isLogin) {
            //jelentkezzen be
            try{
                await login(formdata.email,formdata.password);
            }
            catch(Error){
                console.log(`Authentication error ${Error}`)
            }
        }
        //ha nem letezik
        else{
            try{
            //regisztraljon
                await register(formdata.name!,formdata.email,formdata.password,formdata.password_confirmation!);
            }
            catch(Error){
                console.log(`Authentication error ${Error}`)
            }
        }
    }

    return <>
         <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{width: "400px"}}>
            <h3 className="text-center">{isLogin ? "Login":"Register"}</h3>
            <form onSubmit={handleFormSubmit}>
                {
                    !isLogin && (
                    <input className="form-control mb-2" 
                    name="name" 
                    type="text"
                    value={formdata.name}
                    onChange={handleOnChangeInput} 
                    placeholder="Name" 
                    required
                    />
                )
                }

                <input className="form-control mb-2" 
                name="email" 
                type="email"
                value={formdata.email}
                onChange={handleOnChangeInput}  
                placeholder="Email" 
                required
                />

                <input className="form-control mb-2" 
                name="password" 
                type="password"
                value={formdata.password}
                onChange={handleOnChangeInput}  
                placeholder="Password" 
                required
                />
                {
                    !isLogin &&(
                    <input className="form-control mb-2" 
                    name="password_confirmation" 
                    type="password"
                    value={formdata.password_confirmation}
                    onChange={handleOnChangeInput}  
                    placeholder="Confirm Password" 
                    required
                    />
                    )
                }
                <button className="btn btn-dark w-100" type="submit">{isLogin?"Login":"Register"}</button>
            </form>

            <p className="mt-3 text-center">
                {isLogin ? "Don't have an account? ":"Already have an account? "}
                <span onClick={()=>setIsLogin(!isLogin)} style={{cursor:"pointer"}}>
                    {
                        isLogin ? "Register":"Login"
                    }
                </span>
            </p>
        </div>
    </div>
        
    </>
}

export default Auth;