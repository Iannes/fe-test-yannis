export type CallItem = {
  __typename: string;
  id: string;
  direction: string;
  from: string;
  to: string;
  duration: number;
  is_archived: boolean;
  call_type: string;
  via: string;
  created_at: string;
  notes: {
    __typename: string;
    id: string;
    content: string;
  }[];
};

export type CallIconProps = {
  icon: string;
  color: string;
};

export enum CallType {
  MISSED = "missed",
  ANSWERED = "answered",
  VOICEMAIL = "voicemail",
}

export enum CallDirection {
  INBOUND = "inbound",
  OUTBOUND = "outbound",
}

export type Archive = "archive";
