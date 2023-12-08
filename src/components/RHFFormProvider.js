import React from "react";
import { FormProvider } from "react-hook-form";

const RHFFormProvider = ({ methods, onSubmit, children, ...other }) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} {...other}>
        {children}
      </form>
    </FormProvider>
  );
};

export default RHFFormProvider;
