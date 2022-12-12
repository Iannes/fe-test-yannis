import { Filters } from "lib/contexts/FiltersProvider";
import { CallItem, CallType } from "types/Calls";

export const getFIlter = (
  filter: Filters,
  item: CallItem
): boolean | CallItem => {
  switch (filter) {
    case Filters.ARCHIVED:
      return item.is_archived;
    case Filters.MISSED:
      return item.call_type === CallType.MISSED;
    case Filters.ANSWERED:
      return item.call_type === CallType.ANSWERED;
    default:
      // return all by default
      return item;
  }
};
