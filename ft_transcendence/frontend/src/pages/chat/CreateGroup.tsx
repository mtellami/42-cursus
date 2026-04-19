import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import photo2 from '../../photos/ajouter-une-image.png'
import axios from "axios";
import { stat } from "fs";
import { Link, useNavigate } from "react-router-dom";

import { Fragment } from 'react'
import { listofgroup, stateType } from "../../interfaces/Chat";
// import { Menu, Transition } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/solid'
import { useLocation } from 'react-router-dom';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}



const CreateGroup = () => {

    const [show, setShow] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [state, setState] = useState<stateType>(stateType.PUBLIC);
    const [password, setPassword] = useState<string | null>(null);
    const [image , setImage] = useState<File | null>(null);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newState : stateType = stateType.PUBLIC;
        if (event.target.value === "Private")
            newState = stateType.PRIVATE;
        else if (event.target.value === "protected")
            newState = stateType.PROTECTED;
        setState(newState);
        setShow(newState === stateType.PROTECTED);
        if (newState === stateType.PUBLIC)
            setPassword(null);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (state === stateType.PROTECTED)
        {
            setPassword(event.target.value);
        }
    };
    
    const handlefilechange = (event : React.ChangeEvent<HTMLInputElement>) =>{
        const im = event.target.files?.[0];
        setImage(im ? im : null);
    }
    
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       if (name === "") {
            alert("Name is required!!");
            return;
        }
        if (state === stateType.PROTECTED && password === null) {
            alert("Password is required!!");
            return;
        }
        const data = {
            status : state,
            name : name,
            password : password,

        }
        const request = axios.create({
            baseURL : `${process.env.REACT_APP_HOST_URI}/api/v1/`
          })
        const post = async () => {
           await request.post("chat/create", data
           ).then( res => {
           }).catch (err => {
            alert(err.response.data.message);
           })
            
        }
        post();
        navigate('/chat');
        // You can make your axios request here
    };

    return (
        <div className="mt-10">
            <Navbar />
            <form onSubmit={handleSubmit} >
                <div className="flex justify-center mt-10">
                    <div className=" rounded-t-3xl rounded-b-3xl mt-4 bg-gray-40 h-[50em] w-[30em]">
                        <div className="mt-20">
                            <p className="flex justify-center font text-3xl font-bold  mt-10">Group name</p><br/>
                            <input
                                className="ml-20 mt-3 rounded-full h-[4em] w-[20em] bg-gray-90"
                                type="text"
                                name="Name"
                                required
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="mt-16">
                            <div className="px-20">
                                <div className="flex flex-wrap  gap-8">
                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            className="peer sr-only"
                                            name="group"
                                            value="public"
                                            checked={state === stateType.PUBLIC}
                                            onChange={handleStateChange}
                                        />
                                        <div className="w-36 max-w-xl rounded-full bg-gray-90 p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-semibold uppercase text-gray-500">public</p>
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
                                            checked={state === stateType.PRIVATE}
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
                                            value="protected"
                                            checked={state === stateType.PROTECTED}
                                            onChange={handleStateChange}
                                        />
                                        <div className="w-36 max-w-xl rounded-full bg-gray-90 p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-semibold uppercase text-gray-500">protected</p>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {show && (
                            <label>
                                <p className="font text-2xl font-bold ml-28 mt-10">Password</p>
                                <input
                                    className="ml-20 mt-2 rounded-full h-[4em] w-[20em] bg-gray-90"
                                    type="password"
                                    name="password"
                                    value={password || ''}
                                    onChange={handlePasswordChange}
                                />
                            </label>
                        )}
                        <div className="flex justify-center">
                            <button className=" mt-16 rounded-full h-[3em] w-[8em] bg-gray-90" type="submit">SAVE</button>
                        </div>
                    </div>
                </div>
            </form>


        </div>
    );
}

export default CreateGroup;
