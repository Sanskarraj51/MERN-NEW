import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RHFFormProvider from "./src/components/RHFFormProvider";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFInput from "./src/components/RHFInput";

let defaultValues = {
  users: [
    {
      name: "",
      emai: "",
      password: "",
    },
  ],
};

const regexPass =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

const schema = yup.object({
  users: yup.array().of(
    yup.object().shape({
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

function AddMultipleUsers() {
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
    control,
    name: "users",
  });

  function onSubmit(data) {
    console.log("data", data);
  }

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
          <RHFInput name="password" />
        </div>
        <div className="flex flex-col ">
          <label className="text-xl ">City</label>
          <RHFInput name="address.city" />
        </div>
        <div className="flex flex-col ">
          <label className="text-xl ">State</label>
          <RHFInput name="address.state" />
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

export default AddMultipleUsers;
