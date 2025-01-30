import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/auth-slice";

const initialFormData = {
  username: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Please fill all the fields");
      return;
    }
    dispatch(login(formData)).then((res) => {
      if (res.payload?.success) {
        navigate("/");
      } else {
        setError(res.payload?.message || "Login failed");
      }
    });
  };

  return (
    <div className="min-w-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="rounded-lg shadow-lg flex overflow-hidden m-4 text-center"
      >
        <div className="p-4 bg-white border w-30 space-y-4">
          <h2 className="font-bold text-xl mb-2">Login Account</h2>
          <input
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
              setError(null);
            }}
            type="text"
            placeholder="Username"
            className="outline-none border-non border p-2 w-full"
          />
          <input
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setError(null);
            }}
            type="password"
            placeholder="Password"
            className="border outline-none p-2 w-full"
          />
          <p className="text-red-400 text-xs">{error}</p>
          <button
            type="submit"
            className="mt-5 font-bold bg-blue-900 text-white border border-transparent w-36 p-2 rounded-md hover:bg-transparent hover:border-blue-900 hover:text-blue-900"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
