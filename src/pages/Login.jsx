import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
// import { useContext } from "react";
// import AuthContext from "../context/AuthProvider"
// import axios from "../api/axios";
import { useNavigate } from "react-router-dom"

// const LOGIN_URL='/addLogin'

const Login=()=>{

    let navigate=useNavigate();

    // const {setAuth}=useContext(AuthContext);


    const userRef=useRef();
    const errRef=useRef();
    
    
    const [user_id,setId]=useState("");
    const [password,setPassword]=useState("");
    const [errMsg,setErrMsg]=useState("");
    const [success,setSuccess]=useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[]);

    useEffect(()=>{
        setErrMsg('');
    },[user_id,password])

    
    // const handleSubmit=async(e)=>{
    //     e.preventDefault();

    //     try{
    //         const response=await axios.post(LOGIN_URL,
    //             ({user_id:user_id,password:password}),
    //             {
    //                 // headers:{'Content-Type':'application/json'},
    //                 withCredentials:true
    //             }
                
    //         );
    //         console.log(JSON.stringify(response?.data));
    //         const userToken = response?.data?.userToken;
    //         setAuth({ user_id, password, userToken });
    //         setId('');
    //         setPassword('');
    //         setSuccess(true);
            
            
    //     }catch(err){
    //         if(!err?.response){
    //             setErrMsg('No Server Response');
    //         }else if (err.response?.status===400){
    //             setErrMsg('Missing User ID or Password');
    //         }else if (err.response?.status===401){
    //             setErrMsg('Unauthorized');
    //         }else {
    //             setErrMsg('Login failed')
    //         }
    //         errRef.current.focus();
    //     }
    // }

    const loginUser=async(e)=>{
        e.preventDefault();

        const res=await fetch('/addLogin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                user_id:user_id,
                password:password
            })
        });

        const data=res.json();

        if(res.status===404 || !data){
            window.alert('Invalid credentials')
        }else{
            navigate('/home')
            window.alert('Login Successful')
        }
    }



    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                </section>
            ) : (
                <section>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <h1>Login</h1>
                    <form method="POST">
                        <label htmlFor="user_id">User ID : </label>
                        <input
                            type="text"
                            id="user_id"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setId(e.target.value)}
                            value={user_id}
                            required
                        />
                        <label htmlFor="password">Password : </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button onClick={loginUser} >Login</button>
                    </form>
                </section>
            )}
        </>
    );
}

export default Login;