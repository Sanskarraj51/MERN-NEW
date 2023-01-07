import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // login function with api
  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    // axios call
    axios
      .post("http://localhost:4000/user/login", data)
      .then((res) => {
        console.log(res);
        localStorage.clear();
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/success");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="w-screen h-[80vh] flex  justify-center items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col  w-[50%]  space-y-4  "
      >
        <h1 className="text-xl "> Login</h1>

        <div className="flex flex-col ">
          <label className="text-xl ">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Your Email"
            className=" border border-zinc-400 outline-none  px-6 py-2 text-black "
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-xl ">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Enter Your Password"
            className=" border border-zinc-400 outline-none  px-6 py-2 text-black "
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center bg-blue-300 py-3 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
