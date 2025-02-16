import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/auth-slice";

const ResetPassword = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }
    const token = sessionStorage.getItem("token");
    dispatch(resetPassword({formData, token})).then((res) => {
      if (res?.payload?.success) {
        onClose();
      } else {
        setError(res?.payload?.message);
      }
    });
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-50 flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-96 h-fit p-6 bg-white text-black rounded space-y-2"
      >
        <p className="sm:text-lg font-semibold mb-2 block">
          Change Your Password
        </p>
        {error && <p className="text-red-400 text-sm">* {error}</p>}
        <p>Old Password</p>
        <input
          type="text"
          placeholder="Old Password"
          className="outline-none border-non border p-2 w-full"
          onChange={(e) =>
            setFormData({ ...formData, oldPassword: e.target.value })
          }
          required
        />

        <p>New Password</p>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="outline-none border-non border p-2 w-full"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button
            type="button"
            className="absolute top-3 right-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <i className="fa fa-eye"></i>
            ) : (
              <i className="fa fa-eye-slash"></i>
            )}
          </button>
        </div>
        <p>Confirm Password</p>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="outline-none border-non border p-2 w-full"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
          <button
            type="button"
            className="absolute top-3 right-2"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <i className="fa fa-eye"></i>
            ) : (
              <i className="fa fa-eye-slash"></i>
            )}
          </button>
        </div>

        <div className="flex gap-2 items-center justify-center p-2">
          <button type="button" className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="save">
            Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;