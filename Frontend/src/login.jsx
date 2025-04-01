// inside src/Login.jsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import Axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./App.css";

function Login() { // Capitalized the function name to "Login"
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate(); // Initialize navigate function

    // State to track if user is logged in
    const [loginMessage, setLoginMessage] = useState(""); // To display login messages

    const onSubmit = async (data) => {
        try {
            // Send a POST request to the login endpoint
            const response = await axios.post("http://localhost:5000/login", {
                email: data.email,
                password: data.password,
            });

            // Handle successful login
            console.log(response.data.message); // Assuming the server sends a success message
            localStorage.setItem("token", response.data.token); // Example of storing JWT token

            // Redirect to dashboard after successful login
            navigate("/dashboard"); // Redirect to dashboard route
        } catch (error) {
            // Handle error responses from the server
            if (error.response) {
                console.log(error.response.data.message); // Assuming the server sends an error message
                setLoginMessage(error.response.data.message); // Set error message for display
            } else {
                console.log("An error occurred while logging in:", error.message);
                setLoginMessage("An error occurred while logging in.");
            }
        }
    };

    return (
        <>
            <p className="title">Login Form</p>

            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                {/* Email input */}
                <input type="email" {...register("email", { required: true })} placeholder="Enter your email" />
                {errors.email && <span style={{ color: "red" }}>
                    *Email* is mandatory </span>}
                
                {/* Password input */}
                <input type="password" {...register("password", { required: true })} placeholder="Enter your password" />
                {errors.password && <span style={{ color: "red" }}>
                    *Password* is mandatory </span>}
                
                {/* Submit button */}
                <button type="submit" style={{ backgroundColor: "#a1eafb" }}>
                    Submit
                </button>

                {/* Display error message if any */}
                {loginMessage && <p style={{ color: "red" }}>{loginMessage}</p>}
            </form>
        </>
    );
}

export default Login; // Ensure you export the component correctly
