import axios from "axios";
import React, { useRef, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };


    function validate() {
        if(!validateEmail(emailRef.current.value)) {
            alert("Email is not valid")
            emailRef.current.focus();
            emailRef.current.style.outlineColor = "red";
            return false;
        }
        return true;
    }
    
    function handLogin(event) {
        event.preventDefault();
        const isValid = validate();
        if(!isValid) {
            return;
        }

        const userLogin = {
            "email": emailRef.current.value,
            "password": passwordRef.current.value
        }
        setLoading(true)
        axios.post(`${import.meta.env.VITE_API_URL}/login`, userLogin, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if(response.data.accessToken) {
                  localStorage.setItem("token", response.data.accessToken),
                  localStorage.setItem("user", JSON.stringify(response.data.user))
                    navigate("/");
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                } else {
                    alert("Xatolik yuz berdi, qayta urinib ko'ring.")
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
              setLoading(false)
            })
    }

  return (
    <div className="base-container mt-36  flex flex-col justify-center items-center">
      <form className="flex flex-col justify-center items-center w-1/3 bg-gray-800 p-8 rounded-lg">
        <h2 className="text-6xl font-extrabold text-purple-500 mb-6">
          Login
        </h2>
        <div className="flex items-center border-b-2 border-gray-600 mb-4 w-full">
          <FaEnvelope className="text-gray-400 mr-2" />
          <input
            ref={emailRef}
            className="bg-transparent outline-none p-2 w-full text-gray-200"
            type="email"
            placeholder="Enter your email..."
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-600 mb-4 w-full">
          <FaLock className="text-gray-400 mr-2" />
          <input
            ref={passwordRef}
            className="bg-transparent outline-none p-2 w-full text-gray-200"
            type="password"
            placeholder="Enter password..."
          />
        </div>
        <button disabled={loading} onClick={handLogin} className="p-4 w-1/2 rounded-md text-white bg-purple-600 hover:bg-purple-700">{loading ? "Logging in" : "Login"}</button>
        <Link className="text-gray-500 mt-4" to='/register'>Akkaunt yo'qmi?? <span className="text-purple-500 hover:underline">Register</span></Link>
      </form>
    </div>
  );
}

export default Register;
