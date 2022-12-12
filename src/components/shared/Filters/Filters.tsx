import * as React from "react";
import {
  Dropdown,
  DropdownButton,
  PreferencesOutlined,
  Menu,
} from "@aircall/tractor";
import { FilterItem } from "./FilterItem";

import copy from "copy/filters.json";
import {
  ActionType,
  Filters as FiltersType,
  useFilter,
} from "lib/contexts/FiltersProvider";

export const Filters = () => {
  const { filterDispatch } = useFilter();
  const handleSelect = (filterItem: FiltersType) => {
    filterDispatch({ type: ActionType.SET_FILTER, payload: filterItem });
  };
  return (
    <Dropdown
      trigger={
        <DropdownButton
          mode="link"
          variant="primary"
          iconClose={<PreferencesOutlined />}
        >
          {copy.dropDownTitle}
        </DropdownButton>
      }
    >
      <Menu>
        {copy.filterItems.map((filterItem, i) => (
          <FilterItem
            key={`${filterItem}-${i}`}
            item={filterItem.copy}
            onClick={() => handleSelect(filterItem.filter as FiltersType)}
          />
        ))}
      </Menu>
    </Dropdown>
  );
};
