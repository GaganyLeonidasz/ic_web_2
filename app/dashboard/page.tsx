"use client";
import React, { useEffect, useState } from "react";
import { myAppHook } from "@/context/AppProvider";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Dashboard: React.FC = () => {
    //save tipus
    interface SaveType{
        id:number,
        created_at?:string,
        "file"?:string,
        "bannerInput"?:File|null
    }
    const API_URL=`${process.env.NEXT_PUBLIC_API_URL}`
    //authtoken miatt kell
    const{isLoading,authToken} = myAppHook();
    //iranyito
    const router = useRouter();
    //filera hivatkozas
    const fileRef = React.useRef<HTMLInputElement>(null)
    const [saves,setSaves] = useState<SaveType[]>([])
    //formbol erkezo adat
    const [formData,setFormData]= useState<SaveType>({
        "file":"",
        "bannerInput":null,
        id:0
    })
    //ha nincs bejelentkezve
    useEffect(()=>{
        if (!authToken) {
            router.push("/auth")
            return
        }
        fetchAllSaves();
    },[authToken])
    //Form bekuldese
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log(formData)
            try {
            //API kerelem elkuldese
              const response = await axios.post(`${API_URL}/saves/store`,formData,{
                headers:{
                    Authorization:`Bearer ${authToken}`,
                    "Content-Type":"multipart/form-data",
                }
              })
            //Alert sikeres feltoltesnel,adatok alaphelyzetbe allitasa
            if (response.data.status) {
                toast.success(response.data.message)
                setFormData({
                    "file":"",
                    "bannerInput":null,
                    id:0
                })
                //File input alaphelyzetbe allitasa
                if (fileRef.current) {
                    fileRef.current.value ="";
                }
            }
            //Error logolasa
            } catch (error) {
                console.log(error)
            }
    }
    //Adat valtozasa eseten fut le
    const handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (event.target.files) {
        //Beadjuk az adatokat
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
    /*const handleDeleteSave = async(id:number) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${API_URL}/saves/${id}`,{
                        headers:{
                            Authorization:`Bearer ${authToken}`
                        }
                    })
                    if (response.data.status) {
                        //toast.success(response.data.message)
                        console.log(response)
                        fetchAllSaves();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                } catch (error) {
                    console.log(error)
                }
            }
          });
    }*/
    //Osszes mentes
    const fetchAllSaves = async()=>{
        try {
            const response = await axios.get(`${API_URL}/saves`,{
                headers:{
                    Authorization:`Bearer ${authToken}`
                }
            })
            setSaves(response.data.saves)
        }
        catch (error) {
            console.log(error)
        }
    }
    return <>
         <div className="container mt-5">
        <div className="row">
            <div className="col-md-6">
                <div className="card p-4">
                    <h4>Upload Save</h4>
                    <form onSubmit={handleFormSubmit}>
                        <input 
                        className="form-control mb-2"
                        type="file"
                        ref={fileRef}
                        onChange={handleOnChangeEvent}
                        id="bannerInput"/>
                        <button 
                        className="btn btn-dark" 
                        type="submit">Add Save</button>
                    </form>
                </div>
            </div>
            <div className="col-md-6">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            saves.map((singleSave,index)=>(
                                <tr key={index}>
                                <td>{singleSave.id}</td>
                                <td>{singleSave.created_at}</td>
                            </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
}
export default Dashboard;