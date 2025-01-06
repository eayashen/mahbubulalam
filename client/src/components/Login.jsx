import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../redux/isLoggedIn";
import { setToken } from "../redux/loginData";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.loginData);
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") handleLogin();
  };

  const getAccessToken = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const loginResponse = await axios.post(
        "http://13.232.229.42:8000/login",
        formData
      );
      const data = loginResponse.data;
      return data.access_token;
    } catch (error) {
      console.log("Error fetching data:", error);
      return null; // Return null if there's an error
    }
  };

  const handleLogin = () => {
    if (username === "" || password === "") {
      setError("Username or Password is empty");
      return;
    } else {
      getAccessToken().then((token) => {
        if (token === null) {
          setError("Username or Password is incorrect");
          return;
        } else {
          console.log(token);
          dispatch(setValue(true));
          dispatch(setToken(token));
          navigate("/");
          return;
        }
      });
    }
    // else if(username === loginData.userName && password === loginData.password) {
    //     dispatch(setValue(true));
    //     navigate('/');
    //     return;
    // }
    // else {
    //     setError('Username or Password is incorrect');
    //     return;
    // }
  };

  return (
    <div className="min-w-screen flex justify-center items-center">
      <div className="rounded-lg shadow-lg flex overflow-hidden m-4 text-center">
        <div className="p-4 bg-white border w-30 space-y-4">
          <h2 className="font-bold text-xl mb-2">Login Account</h2>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
              setError(null);
            }}
            type="text"
            placeholder="Username"
            className="outline-none border-non border p-2 w-full"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            onKeyPress={handleKeyPress}
            type="password"
            placeholder="Password"
            className="border outline-none p-2 w-full"
          />
          <p className="text-red-400 text-xs">{error}</p>
          <button
            onClick={handleLogin}
            className="mt-5 font-bold bg-blue-900 text-white border border-transparent w-36 p-2 rounded-md hover:bg-transparent hover:border-blue-900 hover:text-blue-900"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
