import { ReactFCC } from "types";
import { Flex, Typography } from "@aircall/tractor";
import { PageSkeleton } from "components/shared/PageSkeleton";
import { useFilter, Filters } from "lib/contexts/FiltersProvider";
import copy from "copy/itemsList.json";

type ItemsListPlaceholderprops = {
  items: Record<string, any>;
};

export const ItemsListPlaceholder: ReactFCC<ItemsListPlaceholderprops> = ({
  items,
}) => {
  const { filterState } = useFilter();
  return filterState.filter !== Filters.ALL && items.length === 0 ? (
    <Flex justifyContent="center" alignContent="center" marginTop="25%">
      <Typography variant="displayS">{copy.noCalls}</Typography>
    </Flex>
  ) : (
    <PageSkeleton />
  );
};
