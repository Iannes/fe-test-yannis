import { CallItem } from "types/Calls";
import { formatDate } from "./formatDate";

type GroupedItems = { [date: string]: CallItem[] };

export const groupByDate = (items: CallItem[]): GroupedItems =>
  items &&
  items?.reduce((acc: GroupedItems, item: CallItem) => {
    const date = new Date(item.created_at);
    const key = date.toISOString().split("T")[0] as any;
    const formattedDate = formatDate(key);
    acc[formattedDate] = acc[formattedDate] || [];
    acc[formattedDate].push(item);
    return acc;
  }, {});
