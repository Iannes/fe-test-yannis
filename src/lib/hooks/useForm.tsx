import DOMPurify from "dompurify";
import { useAuth } from "lib/contexts/AuthProvider";
import { useState } from "react";
import { InputValues } from "types/Form";

export const useForm = () => {
  const auth = useAuth();

  const [username, setUsername] = useState<InputValues>({
    value: "",
    validationStatus: "success",
  });

  const [password, setPassword] = useState<InputValues>({
    value: "",
    validationStatus: "success",
  });

  const handleValidate = (
    inputvalues: InputValues,
    setInputValues: React.Dispatch<React.SetStateAction<InputValues>>,
    key: "username" | "password"
  ) => {
    const regexp = getRegexp(key);
    setInputValues({
      ...inputvalues,
      validationStatus: regexp.test(inputvalues.value) ? "success" : "error",
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputvalues: InputValues,
    setInputValues: React.Dispatch<React.SetStateAction<InputValues>>,
    key: "username" | "password"
  ) => {
    setInputValues({
      ...inputvalues,
      value:
        key === "username"
          ? DOMPurify.sanitize(event.target.value)
          : event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth) return;
    if (username.value.length === 0 || password.value.length === 0) {
      return;
    }
    auth?.login(username.value, password.value);
  };
  return {
    username,
    setUsername,
    password,
    setPassword,
    handleValidate,
    handleChange,
    handleSubmit,
  };
};

function getRegexp(key: string): RegExp {
  return key === "username" ? /^[a-zA-Z]{3,}$/ : /^.{8,}$/;
}
