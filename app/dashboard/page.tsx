"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { myAppHook } from "@/context/AppProvider";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Dashboard: React.FC = () => {
    
    interface SaveType{
        "file":string,
        "bannerInput":File|null
    }

    const API_URL=`${process.env.NEXT_PUBLIC_API_URL}`
    const{isLoading,authToken} = myAppHook();
    const router = useRouter();
    const fileRef = React.useRef<HTMLInputElement>(null)
    const [formData,setFormData]= useState<SaveType>({
        "file":"",
        "bannerInput":null
    })
    useEffect(()=>{
        if (!authToken) {
            router.push("/auth")
            return
        }
    },[authToken])
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log(formData)
            try {
              const response = await axios.post(`${API_URL}/saves/store`,formData,{
                headers:{
                    Authorization:`Bearer ${authToken}`,
                    "Content-Type":"multipart/form-data",
                }
              })  
              console.log(response)
            } catch (error) {
                console.log(error)
            }
            finally{

            }
        
    }
    const handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>)=>{

        if (event.target.files) {
            setFormData({
                ...formData,
                bannerInput:event.target.files[0],
                file: URL.createObjectURL(event.target.files[0]),
            })
        }
        else{
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            })
        }
    }
    return <>
         <div className="container mt-4">
        <div className="row">
            <div className="col-md-6">
                <div className="card p-4">
                    <h4>Add Save</h4>
                    <form onSubmit={handleFormSubmit}>
                        <input 
                        className="form-control mb-2"
                        type="file"
                        ref={fileRef}
                        onChange={handleOnChangeEvent}
                        id="bannerInput"/>
                        <button 
                        className="btn btn-primary" 
                        type="submit">Add Save</button>
                    </form>
                </div>
            </div>
            <div className="col-md-6">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Sample Product</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2">Restore</button>
                                <button className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
}
export default Dashboard;