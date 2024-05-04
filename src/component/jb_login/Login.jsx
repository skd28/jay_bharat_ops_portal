import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/jay_bhart_logo.jpeg";
import Cookies from "js-cookie";
import Icons from "../Icons";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState("hide");

  const naviagte = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSummit = (e) => {
    e.preventDefault();

    if (!!data.username && !!data.password) {
      setLoading(true);
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0fQ.NgpdZuV95m4yxIpuPMq6x0TYw72Hi_7fqm9Zj9jBja8';
      axios
        .post("https://jaybharat-api.vercel.app/jb/auth/login", data)
        .then((response) => {
          // Log token value
          // console.log(response);
          // console.log("Token:", response.data.data.token);
          let { status } = response.data;

          if (status === 404) {

            setLoading(false);
            setError(response.data.error);
            setTimeout(() => setError(null), 2000);

          } else {
            Cookies.set("token", response.data.data.token);

            // Log the token from cookies
            // console.log("Token from cookies:", Cookies.get('token'));

            naviagte("/jb_admin");
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("Login Failed", error);
          setError(error);
          setTimeout(() => setError(null), 2000);
        });
    } else {
      setError("Please Fill Required Fields");
      setTimeout(() => setError(null), 2000);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  ">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 shadow-xl  ">
          <img
            src={image}
            className=" w-[6rem] h-[6rem] m-2   rounded-full"
            alt="..."
          />
          <div className="px-8 flex flex-col relative">
            {!!error && (
              <div className="flex justify-center items-center bg-white mb-3">
                <div className="alert h-14 p-4 bg-[#ff000036] border border-[#ff000047] rounded-md w-full">
                  {error}
                </div>
              </div>
            )}
            <div className="mb-7">
              <form className="space-y-6" onSubmit={handleSummit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      name="username"
                      type="text"
                      autoComplete="off"
                      value={data.username}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="px-2 flex gap-x-1 py-1.5 items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ">
                    <input
                      name="password"
                      type={showPassword === "show" ? "text" : "password"}
                      autoComplete="off"
                      value={data.password}
                      onChange={handleChange}
                      className="block focus:ring-0 focus:outline-none w-full border-0 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {!!data.password && (
                      <div
                        className="flex items-center justify-center"
                        onClick={() =>
                          setShowPassword(
                            showPassword === "show" ? "hide" : "show"
                          )
                        }
                      >
                        <Icons string={showPassword} />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md gap-x-5 bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                    {loading && (
                      <Icons string="loading" width="25px" height="25px" />
                    )}
                    {/* <Link to='/jb_admin'>Login</Link> */}
                  </button>
                </div>
              </form>

              {/* {error && <p className="text-red-500">{error}</p>} Display error message if login fails */}
            </div>
          </div>

          {/* <Loader />  */}
        </div>
      </div>
    </>
  );
};

export default Login;
