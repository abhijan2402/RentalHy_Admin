import React, { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { message } from "antd";
import { toast } from "react-toastify";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Prepare form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(`${baseUrl}admin_login`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Handle non-2xx responses
        const errData = await response.json();
        setError(errData.message || "Login failed");
        return;
      }

      const data = await response.json();
      // Assuming API returns user data & token
      login(data); // Adjust according to API response shape

      // Navigate to dashboard on success
      navigate("/");
      toast.success("Logged In Successfully..!");
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          {error && (
            <div className="mb-4 text-red-600 font-semibold">{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>{" "}
                </Label>
                <Input
                  type="email"
                  placeholder="info@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>{" "}
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                    Keep me logged in
                  </span>
                </div>
                <Link
                  to="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="
                  w-full
                  py-3
                  bg-blue-600
                  text-white
                  font-semibold
                  rounded-lg
                  shadow-md
                  hover:bg-blue-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-400
                  focus:ring-opacity-75
                  transition
                  duration-200
                  ease-in-out
                "
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
