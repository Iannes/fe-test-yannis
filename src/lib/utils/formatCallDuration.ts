import { addSeconds, format } from "date-fns";

export const formatCallDuration = (seconds: number) => {
  const helperDate = addSeconds(new Date(0), seconds);
  return format(helperDate, "mm:ss");
};
