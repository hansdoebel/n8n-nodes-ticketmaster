import type { INodeProperties } from "n8n-workflow";
import * as operations from "./operations";

export const eventOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: { resource: ["event"] },
    },
    options: [
      {
        name: "Search Events",
        value: "search",
        description: "Search for Ticketmaster events by keyword or filters",
        action: "Search events",
      },
      {
        name: "Get Details",
        value: "getDetails",
        description: "Get detailed information for a specific event",
        action: "Get event details",
      },
      {
        name: "Get Images",
        value: "getImages",
        description: "List images available for a specific event",
        action: "Get event images",
      },
    ],
    default: "search",
  },
];

const eventFieldArrays = Object.values(operations).filter(
  (v): v is INodeProperties[] => Array.isArray(v),
);

export const eventsDescription: INodeProperties[] = [
  ...eventOperations,
  ...eventFieldArrays.flat(),
];
