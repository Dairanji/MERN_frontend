import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
// import axios from "axios";

const Home=()=>{

    const navigate=useNavigate();

    const [getRecipe,setRecipe]=useState([]);

    const recipe=async()=>{
        try{
            const response=await fetch('/showRecipe',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            setRecipe(await response.json());

            if(!response.status===200){
                const error=new Error(response.error);
                throw error;
            }
        }catch(err){
            console.log(err);
            navigate('/')
        }
        
    };

    useEffect(()=>{
        recipe();
    },[]);


    return (
        <div>
            <h1>Recipe Data</h1>
            <br />
            {
                getRecipe.map((currentElement) => {
                    return (
                        <div>
                            <table>
                                <tr>
                                    <th>Creator'S Name</th>
                                    <th>Recipe Name</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                </tr>

                                <tr>
                                    <td>{currentElement.creator_id.name}</td>
                                    <td>{currentElement.name}</td>
                                    <td>{currentElement.description}</td>
                                    <td>
                                        <img src={currentElement.image} alt="img" width="150" />
                                    </td>
                                </tr>
                            </table>
                        </div>
                    )

                })
            }

        </div>
    )
}

export default Home;