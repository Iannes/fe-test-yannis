import { InputValues } from "types/Form";
import copy from "copy/form.json";

export const setPasswordHelpText = (password: InputValues) => {
  return `${
    password.validationStatus === "error" ? copy.passwordErrorMessage : ""
  }`;
};
export const setUsernameHelpText = (username: InputValues) => {
  return `${
    username.validationStatus === "error" ? copy.usernameErrorMessage : ""
  }`;
};
