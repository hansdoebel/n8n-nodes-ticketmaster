import type { INodeProperties } from "n8n-workflow";
import * as operations from "./operations";

export const venueOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: { show: { resource: ["venue"] } },
    options: [
      {
        name: "Search Venues",
        value: "search",
        description: 'Search for venues, arenas, stadiums, theatres, etc',
        action: "Search venues",
      },
      {
        name: "Get Details",
        value: "getDetails",
        description: "Retrieve full details of a specific venue by ID",
        action: "Get venue details",
      },
    ],
    default: "search",
  },
];

const venueFieldArrays = Object.values(operations).filter(
  (v): v is INodeProperties[] => Array.isArray(v),
);

export const venuesDescription: INodeProperties[] = [
  ...venueOperations,
  ...venueFieldArrays.flat(),
];
