import type { INodeProperties } from "n8n-workflow";
import * as operations from "./operations";

export const attractionOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: { resource: ["attraction"] },
    },
    options: [
      {
        name: "Search Attractions",
        value: "search",
        description:
          "Search for Ticketmaster attractions by keyword or filters",
        action: "Search attractions",
      },
      {
        name: "Get Details",
        value: "getDetails",
        description: "Retrieve detailed information for a specific attraction",
        action: "Get attraction details",
      },
    ],
    default: "search",
  },
];

const attractionFieldArrays = Object.values(operations).filter(
  (v): v is INodeProperties[] => Array.isArray(v),
);

export const attractionsDescription: INodeProperties[] = [
  ...attractionOperations,
  ...attractionFieldArrays.flat(),
];
