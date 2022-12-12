import { useState, useEffect } from "react";
import { useFormStatus } from "lib/contexts/FormProvider";
import { FormStatus, InputValues } from "types/Form";

export const useDisableSubmit = (
  username: InputValues,
  password: InputValues
) => {
  const [disabled, setDisabled] = useState(true);
  const { state } = useFormStatus();

  useEffect(() => {
    if (state.status === FormStatus.Pending) {
      setDisabled(true);
      return;
    }
    if (username.value.length < 3 || password.value.length < 8) {
      setDisabled(true);
      return;
    }
    if (
      username.validationStatus === "error" ||
      password.validationStatus === "error"
    ) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [username, password, state.status]);

  return disabled;
};
