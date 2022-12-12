import * as React from "react";
import { Button } from "@aircall/tractor";
import styled from "styled-components";

type FilterItemProps = {
  item: string;
  onClick: () => void;
};

export const FilterItem = ({ item, onClick }: FilterItemProps) => {
  return (
    <MenuItem>
      <Button onClick={onClick} mode="link">
        {item}
      </Button>
    </MenuItem>
  );
};

export const MenuItem = styled.div`
   {
    padding: 12px 16px;
    display: flex;
    background-color: rgb(255, 255, 255);
    -webkit-box-align: center;
    align-items: center;
    vertical-align: top;
    flex-direction: row;
  }
`;
