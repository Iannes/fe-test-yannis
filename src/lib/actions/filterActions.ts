import { Action, ActionType, Filters } from "lib/contexts/FiltersProvider";

export const resetFilters = (): Action => ({
  type: ActionType.RESET_FILTER,
  payload: Filters.ALL,
});
