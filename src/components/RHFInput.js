import React from "react";
import { Controller, useFormContext } from "react-hook-form";

// inputRef={ref}
const RHFInput = ({ name, placeholder, ...other }) => {
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
            ref={field.ref}
            placeholder={placeholder || "Enter Your " + name}
            className=" border border-zinc-400 outline-none  px-6 py-2 text-black "
          />
          {error ? <p className="text-red-600">{error?.message}</p> : null}
        </>
      )}
    />
  );
};

export default RHFInput;
