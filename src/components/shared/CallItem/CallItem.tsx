import * as React from "react";
import {
  Grid,
  Box,
  QuickAvatar,
  UserFilled,
  Flex,
  Typography,
  Button,
  Icon,
  ArchiveOutlined,
  ArchiveFilled,
  Tooltip,
} from "@aircall/tractor";
import { getItemSubtitle } from "lib/utils/callItem";
import { formatCallDuration } from "lib/utils/formatCallDuration";
import { ReactFCC } from "types";
import { CallType } from "types/Calls";
import { CallIcon } from "../Calls/CallIcon";
import callItemCopy from "copy/callItem.json"

export const CallItem: ReactFCC<any> = ({ item, onArchive }) => {
  const isMissed = item.call_type === CallType.MISSED;
  const color = isMissed ? "red" : "green";
  return (
    <Grid
      gridTemplateColumns="1fr 2fr 1fr"
      columnGap={2}
      alignItems="center"
      px={{
        _: 6,
        md: 9,
        xl: 8,
      }}
      py={6}
      margin={20}
      background="white"
      borderRadius={9}
    >
      <Box>
        <QuickAvatar icon={UserFilled} variant="primary" />
      </Box>
      <Flex justifyContent="space-around" flexWrap="wrap" alignItems="center">
        <CallIcon icon={item.direction} color={color} />
        <Typography textAlign="right" variant="body">
          {getItemSubtitle(item)}
        </Typography>
        <Button mode="link" id={item.id} onClick={onArchive}>
          <Tooltip
            title={item.is_archived ? callItemCopy.restoreAction : callItemCopy.archiveAction}
            position="bottom"
          >
            <Icon
              color="purple"
              component={item.is_archived ? ArchiveFilled : ArchiveOutlined}
            />
          </Tooltip>
        </Button>
        <Typography variant="caption" textAlign="right">
          {formatCallDuration(item.duration)}
        </Typography>
      </Flex>
    </Grid>
  );
};
