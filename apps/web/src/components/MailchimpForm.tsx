"use client";

import {
  Button,
  Form,
  Input,
  Label,
  TextField as RacTextField,
  TextFieldProps,
} from "react-aria-components";
import {
  useForm,
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

function TextField<T extends FieldValues>({
  control,
  name,
  label,
  isRequired,
  rules,
  ...props
}: TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  label: string;
}) {
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({
        field: { name, value, onChange, onBlur, ref },
        fieldState: { invalid, error },
      }) => (
        <RacTextField
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isInvalid={invalid}
          {...props}
        >
          <div className="flex flex-col">
            <Label>
              {label}
              {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <Input
              ref={ref}
              className={`w-full rounded-md bg-slate-700 p-2 ${error ? "border border-red-500" : ""}`}
            />
            <span className="text-sm text-red-500">{error?.message}&nbsp;</span>
          </div>
        </RacTextField>
      )}
    />
  );
}

export default function MailchimpForm() {
  const { handleSubmit, control } = useForm<{
    EMAIL: string;
    FNAME: string;
    LNAME: string;
  }>();

  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        const formData = new FormData();
        formData.append("EMAIL", data.EMAIL);
        formData.append("FNAME", data.FNAME);
        formData.append("LNAME", data.LNAME);
        formData.append("b_94e7a11a93f47e411755d412a_f50fa47340", "");
        await fetch(
          "https://aucegypt.us19.list-manage.com/subscribe/post?u=94e7a11a93f47e411755d412a&amp;id=f50fa47340&amp;f_id=00cdc2e1f0",
          {
            method: "POST",
            mode: "no-cors",
            body: formData,
          },
        );
      })}
    >
      <div className="flex flex-col items-center">
        <div className="grid w-full grid-cols-2 gap-2 md:w-96">
          <div className="col-span-2">
            <TextField
              control={control}
              isRequired
              rules={{
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: "Invalid email address",
                },
              }}
              type="email"
              name="EMAIL"
              label="Email"
            />
          </div>
          <TextField control={control} name="FNAME" label="First Name" />
          <TextField control={control} name="LNAME" label="Last Name" />
          <div className="col-span-2 flex justify-center">
            <Button
              type="submit"
              name="subscribe"
              value="Subscribe"
              className="col-span-2 cursor-pointer rounded-lg bg-white px-8 py-2 font-bold text-slate-800 hover:bg-slate-200"
            >
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}
