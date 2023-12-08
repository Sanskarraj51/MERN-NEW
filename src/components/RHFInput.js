import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const RHFInput = ({ name, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <input
            {...field}
            {...other}
            placeholder="Enter Your Password"
            className=" border border-zinc-400 outline-none  px-6 py-2 text-black "
          />
          {error ? <p className="text-red-600">{error?.message}</p> : null}
        </>
      )}
    />
  );
};

export default RHFInput;
