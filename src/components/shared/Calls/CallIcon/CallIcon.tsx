import {
  ArchiveFilled,
  InboundOutlined,
  OutboundOutlined,
} from "@aircall/tractor";
import { ReactFCC } from "types";
import { CallDirection, CallIconProps } from "types/Calls";

export const CallIcon: ReactFCC<CallIconProps> = ({ icon, color }) => {
  switch (icon) {
    case CallDirection.INBOUND:
      return <InboundOutlined color={color} />;
    case CallDirection.OUTBOUND:
      return <OutboundOutlined color={color} />;
    default:
      return <ArchiveFilled color={color} />;
  }
};
