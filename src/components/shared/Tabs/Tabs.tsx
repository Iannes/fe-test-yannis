import { Box, Tab } from "@aircall/tractor";
import * as React from "react";

export const Tabs = () => {
  return (
    <Box>
      <Tab.Container defaultActiveTabId={1}>
        <Tab.Menu>
          <Tab.MenuItem id={1}>Tab 1</Tab.MenuItem>
          <Tab.MenuItem id={2}>Tab 2</Tab.MenuItem>
        </Tab.Menu>
        <Tab.Content>
          <Tab.Item id={1}>Tab 1 content</Tab.Item>
          <Tab.Item id={2}>Tab 2 content</Tab.Item>
        </Tab.Content>
      </Tab.Container>
    </Box>
  );
};
