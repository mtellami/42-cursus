import React, { useState } from "react";
import Navbar from "../../components/navbar";
import photo2 from '../../photos/ajouter-une-image.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { stateType } from "../../interfaces/Chat";
import { useLocation } from 'react-router-dom';

const EditGroup = () => {
		let { state } = useLocation();  

    const [show, setShow] = useState<boolean>(false);
    const [name, setName] = useState<string>(state.data.chat.name);
    const [stateq, setState] = useState<stateType>(stateType.PUBLIC);
    const [password, setPassword] = useState<string | null>(null);
    const [image , setImage] = useState<File>();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newState : stateType = stateType.PUBLIC;
        if (event.target.value === "Private")
            newState = stateType.PRIVATE;
        else if (event.target.value === "Protected")
            newState = stateType.PROTECTED;
        setState(newState);
        setShow(newState === stateType.PROTECTED);
        if (newState === stateType.PUBLIC)
            setPassword(null);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (stateq === stateType.PROTECTED)
        {
            setPassword(event.target.value);
        }
    };
    
    const handlefilechange = (event : React.ChangeEvent<HTMLInputElement>) =>{
        const im = event.target.files?.[0];
        setImage(im);
    }
    
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (name === "") {
            alert("Name is required!!");
            return;
        }
        if (stateq === stateType.PROTECTED && password === null) {
            alert("Password is required!!");
            return;
        }
        const post = async () => {

            const data = {
                status : stateq,
                password : password
            }
            const request = axios.create({
                baseURL : `${process.env.REACT_APP_HOST_URI}/api/v1/`
            })
            request.post("chat/change/privacy", data ,{
         params : {
                    chatid : state.data.chat.id,
                }       
            }).then(res => {
            }).catch(err => { 
            });
            request.post("chat/change/name", {name}, {
                params : {
                    chatid : state.data.chat.id,
                }
            }).then(res => {
            }).catch(err => { 
            });;
            const formdata = new FormData();
            formdata.append("file", image ? image : "")
            request.post("chat/change/avatar", formdata,{
                params : {
                           chatid : state.data.chat.id,
                       }     
                }).then(res => {
            }).catch(err => { 
            });;
        }
        post();
        navigate('/chat');
        // You can make your axios request here
    };

    return (
        <div className="mt-5">
            <Navbar />
            <form onSubmit={handleSubmit} >
                <div className="flex justify-center mt-7">
                    <div className="rounded-t-3xl rounded-b-3xl mt-4 bg-gray-40 h-[54em] w-[30em]">
                        <div className="flex justify-center">
                            <label className="w-48 h-48 mt-10 bg-gray-10 rounded-full">
                                <img src={photo2} alt="add photo" className="ml-[3.7em] mt-[3.3em] h-20 w-20" />
                                <input 
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    name="new-photo"
                                    accept="image/jpeg, image/png, image/gif"
                                    onChange={handlefilechange}/>
                            </label>
                        </div>
                        <div className="">
                            <p className="flex justify-center font text-3xl font-bold mt-10">Group name</p>
                            <input
                                className="pl-4 ml-20 mt-5 rounded-full h-[4em] w-[20em] bg-gray-90"
                                type="text"
                                name="Name"
                                value={name}
                                onChange={handleNameChange}
                                />
                        </div>
                        
                        <div className="">
                            <div className="px-20 ml-2 mt-12">
                                <div className="flex flex-wrap gap-3">
                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            className="peer sr-only"
                                            name="group"
                                            value="public"
                                            checked={stateq === stateType.PUBLIC}
                                            onChange={handleStateChange}
                                            />
                                        <div className="w-36 max-w-xl rounded-full bg-gray-90 p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-semibold uppercase text-gray-500"> public</p>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            className="peer sr-only"
                                            name="group"
                                            value="Private"
                                            checked={stateq === stateType.PRIVATE}
                                            onChange={handleStateChange}
                                            />
                                        <div className="w-36 max-w-xl rounded-full bg-gray-90 p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-semibold uppercase text-gray-500">Private</p>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                    <label className="cursor-pointer ml-20 ">
                                        <input
                                            type="radio"
                                            id="pass"
                                            className="peer sr-only"
                                            name="group"
                                            value="Protected"
                                            checked={stateq === stateType.PROTECTED}
                                            onChange={handleStateChange}
                                            />
                                        <div className="w-36 max-w-xl rounded-full bg-gray-90 p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-semibold uppercase text-gray-500">Protected</p>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {show && (
                            <label>
                                <p className="font text-2xl font-bold ml-24 mt-5">Password</p>
                                <input
                                    className="pl-4 ml-20 mt-2 rounded-full h-[4em] w-[20em] bg-gray-90"
                                    type="password"
                                    name="password"
                                    value={password || ''}
                                    onChange={handlePasswordChange}
                                    />
                            </label>
                        )}
                        <div className="flex justify-center">
                            <button className=" mt-7 rounded-full h-[3em] w-[8em] bg-gray-90" type="submit">SAVE</button>
                        </div>
                    </div>
                </div>
            </form>


        </div>
    );
}

export default EditGroup;
