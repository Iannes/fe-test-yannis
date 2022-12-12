import { Filters } from "lib/contexts/FiltersProvider";
import { getFIlter } from "lib/utils/getFilter";
import { groupByDate } from "lib/utils/groupByDate";
import { useState, useEffect } from "react";
import { CallItem } from "types/Calls";

export const useFilteredCalls = (
  filter: Filters,
  paginatedCalls: CallItem[]
) => {
  const [groupedItems, setGroupedItems] = useState<any>({});
  const [groupedItemsArray, setGroupedItemsArray] = useState<any>([]);

  useEffect(() => {
    if (paginatedCalls) {
      const filteredCalls = paginatedCalls.filter((paginatedCall: CallItem) =>
        getFIlter(filter, paginatedCall)
      );
      const filteredGroupedItems = groupByDate(filteredCalls);
      setGroupedItems(filteredGroupedItems);
      const filteredItemsArray = Object.keys(filteredGroupedItems);
      setGroupedItemsArray(filteredItemsArray);
    } else if (paginatedCalls) {
      const grouped = groupByDate(paginatedCalls);
      setGroupedItems(grouped);
      const groupedItemsArr = Object.keys(grouped);
      setGroupedItemsArray(groupedItemsArr);
    }
  }, [filter, paginatedCalls]);

  return {
    groupedItems,
    groupedItemsArray,
  };
};
