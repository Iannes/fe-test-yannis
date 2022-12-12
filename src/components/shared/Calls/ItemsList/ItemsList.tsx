import * as React from "react";
import { ReactFCC } from "types";
import { Box, Typography } from "@aircall/tractor";
import { CallItem } from "components/shared/CallItem";
import { CallItem as CallItemType } from "types/Calls";
import { ItemsListPlaceholder } from "../ItemsListPlaceholder";

type ItemsListProps = {
  groupedItemsArray: Record<string, any>;
  groupedItems: any;
  handleArchive: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const ItemsList: ReactFCC<ItemsListProps> = ({
  groupedItemsArray,
  groupedItems,
  handleArchive,
}) => {
  return groupedItemsArray.length > 0 ? (
    groupedItemsArray.map((date: string) => {
      return (
        <Box key={date}>
          <Typography color="green" variant="subheading" pt={4} pb={4} pl={8}>
            {date}
          </Typography>
          <Box>
            {groupedItems[date].map((item: CallItemType) => (
              <CallItem key={item.id} item={item} onArchive={handleArchive} />
            ))}
          </Box>
        </Box>
      );
    })
  ) : (
    <ItemsListPlaceholder items={groupedItemsArray} />
  );
};
