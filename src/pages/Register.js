import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RHFFormProvider from "../components/RHFFormProvider";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFInput from "../components/RHFInput";

let intial = { name: "", email: "", password: "" };

let defaultValues = {
  users: [intial],
};

const regexPass =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

const schema = yup.object({
  users: yup.array().of(
    yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().email().required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .matches(
          regexPass,
          "Password must contain small case,uppeercase,symbol,and number"
        ),
    })
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

  const {
    handleSubmit,
    control,
    watch,

    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "users", // unique name for your Field Array
  });

  console.log("fields", fields?.length);

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


  return (
    <div className=" w-screen min-h-[80vh] flex  justify-center items-center">
      <RHFFormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  w-full  space-y-4  px-12 py-2 "
      >
        <h1 className="text-xl "> Signup Multiple</h1>

        {fields?.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-3 w-full justify-center items-end"
          >
            <div className="flex flex-col w-1/3 ">
              <label className="text-xl ">User Name</label>

              <RHFInput name={`users.${index}.name`} />
            </div>
            <div className="flex flex-col w-1/3">
              <label className="text-xl ">Email</label>
              <RHFInput name={`users.${index}.email`} type="email" />
            </div>
            <div className="flex flex-col w-1/3 ">
              <label className="text-xl ">Password</label>
              <RHFInput name={`users.${index}.password`} />
            </div>
            <div
              className={`flex flex-col w-auto ${
                fields?.length > 1 ? " " : " hidden"
              } `}
            >
              <button
              className="text-red-600"
                type="button"
                onClick={() => {
                  remove(index);
                }}
              >
                remove
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-end items-end">
          <button
            type="button"
            onClick={() => {
              append(intial);
            }}
          >
            + Add More
          </button>
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
