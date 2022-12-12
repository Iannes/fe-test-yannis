import { FormItemStatuses } from "@aircall/tractor";

export enum FormStatus {
  Idle = "Idle",
  Pending = "Pending",
}

export type FormValues = {
  password: string;
  username: string;
};

export type InputValues = {
  value: string;
  validationStatus: FormItemStatuses;
};
