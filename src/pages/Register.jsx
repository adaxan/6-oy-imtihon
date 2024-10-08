import axios from "axios";
import React, { useRef, useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const ageRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const repasswordRef = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    
      function validatePassword(pw) {

        return /[a-z]/       .test(pw) &&
               /[0-9]/       .test(pw) &&
               pw.length > 4;
    }


    function validate() {
        if(firstnameRef.current.value.length < 3) {
            alert("Firstname is not valid")
            firstnameRef.current.focus();
            firstnameRef.current.style.outlineColor = "red";
            return false;
        }
        if(lastnameRef.current.value.length < 3) {
            alert("Lastname is not valid")
            lastnameRef.current.focus();
            lastnameRef.current.style.outlineColor = "red";
            return false;
        }
        if(ageRef.current.value.length < 0) {
            alert("Age is not valid")
            ageRef.current.focus();
            ageRef.current.style.outlineColor = "red";
            return false;
        }
        if(!validateEmail(emailRef.current.value)) {
            alert("Email is not valid")
            emailRef.current.focus();
            emailRef.current.style.outlineColor = "red";
            return false;
        }
        if(!validatePassword(passwordRef.current.value)) {
            alert("Parol kamida 4 ta belgidan iborat bo'lishi, harf va kamida 1 ta raqam o'z ichiga olishi kerak")
            passwordRef.current.focus();
            passwordRef.current.style.outlineColor = "red";
            return false;
        }
        if(passwordRef.current.value != repasswordRef.current.value) {
            alert("Parollar mos kelmadi")
            repasswordRef.current.focus();
            repasswordRef.current.style.outlineColor = "red";
            return false;
        }
        return true;
    }
    
    function handRegister(event) {
        event.preventDefault();
        const isValid = validate();
        if(!isValid) {
            return;
        }

        const userRegister = {
            "firstName": firstnameRef.current.value,
            "lastName": lastnameRef.current.value,
            "age": ageRef.current.value,
            "email": emailRef.current.value,
            "password": passwordRef.current.value,
            "confirmPassword": repasswordRef.current.value
        }
        setLoading(true)
        axios.post(`${import.meta.env.VITE_API_URL}/register`, userRegister, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if(response.data.message == "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi") {
                    navigate("/login");
                    firstnameRef.current.value = '';
                    lastnameRef.current.value = '';
                    agenameRef.current.value = '';
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                    repasswordRef.current.value = '';
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
          Register
        </h2>

        <div className="flex items-center border-b-2 border-gray-600 mb-4 w-full">
          <FaUser className="text-gray-400 mr-2" />
          <input
            ref={firstnameRef}
            className="bg-transparent outline-none p-2 w-full text-gray-200"
            type="text"
            placeholder="Enter your firstname..."
          />
        </div>
        <div className="flex items-center border-b-2 border-gray-600 mb-4 w-full">
          <FaUser className="text-gray-400 mr-2" />
          <input
            ref={lastnameRef}
            className="bg-transparent outline-none p-2 w-full text-gray-200"
            type="text"
            placeholder="Enter your lastname..."
          />
        </div>
        <div className="flex items-center border-b-2 border-gray-600 mb-4 w-full">
          <FaUser className="text-gray-400 mr-2" />
          <input
            ref={ageRef}
            className="bg-transparent outline-none p-2 w-full text-gray-200"
            type="number"
            placeholder="Enter your age..."
          />
        </div>
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
            placeholder="Create password..."
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-600 mb-8 w-full">
          <FaLock className="text-gray-400 mr-2" />
          <input
            ref={repasswordRef}
            className="bg-transparent outline-none p-2 w-full text-gray-200"
            type="password"
            placeholder="Confirm password..."
          />
        </div>
        <button disabled={loading} onClick={handRegister} className="p-4 w-1/2 rounded-md text-white bg-purple-600 hover:bg-purple-700">{loading ? "Registering" : "Register"}</button>
        <Link className='mt-4 text-gray-500' to='/login'>Akkaunt bormi?? <span className="text-purple-500 hover:underline">Login</span></Link>
      </form>
    </div>
  );
}

export default Register;
