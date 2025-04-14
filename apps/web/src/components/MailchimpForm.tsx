"use client";

import { useState } from "react";
import { Form, Input } from "react-aria-components";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "./TextField";

export default function MailchimpForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<{
    EMAIL: string;
    FNAME: string;
    LNAME: string;
  }>();

  return (
    <Form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        control={control}
        name="EMAIL"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <TextField
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isInvalid={invalid}
          >
            <Input ref={ref} />
          </TextField>
        )}
      />
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="email"
            {...register("EMAIL", { required: true })}
            className="col-span-2"
          />
          <input type="text" {...register("FNAME")} />
          <input type="text" {...register("LNAME")} />
        </div>
        <input
          type="submit"
          name="subscribe"
          id="mc-embedded-subscribe"
          value="Subscribe"
        />
      </div>
    </Form>
  );
}
