import React from "react";
import {
  Button,
  Form,
  FormItem,
  FormItemStatuses,
  Grid,
  Icon,
  SpinnerOutlined,
  TextFieldInput,
} from "@aircall/tractor";
import {
  setPasswordHelpText,
  setUsernameHelpText,
} from "lib/utils/setFormHelpText";
import { useForm } from "lib/hooks/useForm";
import { useFormStatus } from "lib/contexts/FormProvider";
import { FormStatus } from "types/Form";
import { useDisableSubmit } from "lib/hooks/useDisableSubmit";

export const LoginForm = () => {
  const {
    username,
    password,
    setUsername,
    setPassword,
    handleChange,
    handleSubmit,
    handleValidate,
  } = useForm();

  const disabled = useDisableSubmit(username, password);
  const { state } = useFormStatus();

  return (
    <Form onSubmit={handleSubmit} width="100%">
      <Grid columnGap={4} rowGap={5} gridTemplateColumns="1fr">
        <FormItem
          label="Username"
          name="username"
          validationStatus={username.validationStatus as FormItemStatuses}
          helpText={setUsernameHelpText(username)}
        >
          <TextFieldInput
            onBlur={() => handleValidate(username, setUsername, "username")}
            value={username.value}
            onChange={(event) =>
              handleChange(event, username, setUsername, "username")
            }
          />
        </FormItem>
        <FormItem
          label="Password"
          name="password"
          validationStatus={password.validationStatus as FormItemStatuses}
          helpText={setPasswordHelpText(password)}
        >
          <TextFieldInput
            type="password"
            value={password.value}
            onBlur={() => handleValidate(password, setPassword, "password")}
            onChange={(event) =>
              handleChange(event, username, setPassword, "password")
            }
            required
          />
        </FormItem>
        <FormItem>
          <Button
            type="submit"
            block
            disabled={disabled}
            aria-disabled={disabled}
          >
            {state.status === FormStatus.Pending ? (
              <Icon component={SpinnerOutlined} spin />
            ) : (
              "Login"
            )}
          </Button>
        </FormItem>
      </Grid>
    </Form>
  );
};
