import { CallDirection, CallItem } from "types/Calls";

export const getItemSubtitle = (call: CallItem) => {
  const isInbound = call.direction === CallDirection.INBOUND;

  return `${isInbound ? call.from : call.to}`;
};
