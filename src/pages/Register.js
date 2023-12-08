import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RHFFormProvider from "../components/RHFFormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFInput from "../components/RHFInput";

let defaultValues = {
  name: "",
  email: "",
  password: "",
};

const regexPass =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  address: yup.object({
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
  }),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      regexPass,
      "Password must contain small case,uppeercase,symbol,and number"
    ),
});

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, control, watch
  
  ,formState:{errors}
  } = methods;

  const navigate = useNavigate();
  console.log("errors", errors);

  function onSubmit(data) {
    console.log("data", data);
    // const data = {
    //   username: userName,
    //   email: email,
    //   password: password,
    // };
    // axios
    //   .post("http://localhost:4000/user/signup", data)
    //   .then((res) => {
    //     console.log(res);
    //     localStorage.clear();
    //     localStorage.setItem("token", JSON.stringify(res.data.token));
    //     navigate("/login");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  console.log("dddddd", watch("name"));

  return (
    <div className=" w-screen h-[80vh] flex  justify-center items-center">
      <RHFFormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  w-[50%]  space-y-4  "
      >
        <h1 className="text-xl "> Signup</h1>
        <div className="flex flex-col ">
          <label className="text-xl ">User Name</label>

          <RHFInput name="name" />
        </div>
        <div className="flex flex-col ">
          <label className="text-xl ">Email</label>
          <RHFInput name="email" type="email" />
        </div>
        <div className="flex flex-col ">
          <label className="text-xl ">Password</label>
          <RHFInput name="password"  />
        </div>
        <div className="flex flex-col ">
          <label className="text-xl ">City</label>
          <RHFInput name="address.city"  />
        </div>
        <div className="flex flex-col ">
          <label className="text-xl ">State</label>
          <RHFInput name="address.state"   />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center bg-blue-300 py-3 rounded-lg"
        >
          Submit
        </button>
      </RHFFormProvider>
    </div>
  );
}

export default Register;
