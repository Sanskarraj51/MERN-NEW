import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RHFFormProvider from "../components/RHFFormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFInput from "../components/RHFInput";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

let defaultValues = {
  type: "email",
  type2: "email",
  name: "",
  email: "",
  password: "",
};

const regexPass =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

const schema = yup.object({
  type: yup.string(),
  type2: yup.string(),
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      regexPass,
      "Password must contain small case,uppeercase,symbol,and number"
    ),
  email: yup.string().when(["type", "type2"], {
    is: (type, type2) => type === "email" && type2 === "email",
    then: () => yup.string().email().required("Email is required"),
  }),
  mobile: yup.string().when("type", {
    is: "mobile",
    then: () => yup.string().email().required("Mobile is required"),
  }),
});

function DyanamicUsersForm() {
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
    setFocus,
    setValue,
    formState: { errors },
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

  useEffect(() => {
    let erroArray = Object.keys(errors);
    if (!erroArray?.length) return;
    const firstError = erroArray[0];
    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);

  return (
    <div className=" w-screen min-h-[80vh] gap-6 overflow-auto flex flex-col justify-center items-center">
      <h1 className="text-xl "> Signup</h1>
      <RHFFormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2   w-[50%] gap-5 "
      >
        <div className="col-span-2 ">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Signup With
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={watch("type")}
              row
              onChange={(event) => {
                setValue("type", event.target.value);
              }}
            >
              <FormControlLabel
                value="email"
                control={<Radio />}
                label="Email"
              />
              <FormControlLabel
                value="mobile"
                control={<Radio />}
                label="Mobile"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="flex flex-col ">
          <label className="text-xl ">User Name</label>
          <RHFInput name="name" />
        </div>
        {watch("type") === "email" ? (
          <div className="flex flex-col ">
            <label className="text-xl ">Email</label>
            <RHFInput name="email" type="email" />
          </div>
        ) : (
          <div className="flex flex-col ">
            <label className="text-xl ">Mobile</label>
            <RHFInput name="mobile" type="number" />
          </div>
        )}
        <div className="flex flex-col ">
          <label className="text-xl ">Password</label>
          <RHFInput name="password" />
        </div>
        <button
          type="submit"
          className="w-full max-w-[12rem] flex justify-center items-center bg-blue-300 py-3 rounded-lg"
        >
          Submit
        </button>
      </RHFFormProvider>
    </div>
  );
}

export default DyanamicUsersForm;
