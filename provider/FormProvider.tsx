"use client";
import type { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";

type PropType = {
  children: ReactNode;
};

export function ClientFormProvider({ children }: PropType) {
  const methods = useForm({
    mode: "onChange",
    criteriaMode: "all"
  });

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  );
}
