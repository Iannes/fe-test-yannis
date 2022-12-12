import { Action, ActionType } from "lib/contexts/FormProvider";
import { FormStatus } from "types/Form";

export const setFormStatus = (formStatus: FormStatus): Action => ({
  type: ActionType.SET_FORM_STATUS,
  payload: formStatus,
});
