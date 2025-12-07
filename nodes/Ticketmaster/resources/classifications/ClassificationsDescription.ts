import type { INodeProperties } from "n8n-workflow";
import * as operations from "./operations";

export const classificationOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: { resource: ["classification"] },
    },
    options: [
      {
        name: "Search Classifications",
        value: "search",
        description:
          "Search classification categories (segment, genre, type, etc.)",
        action: "Search classifications",
      },
      {
        name: "Get Details",
        value: "getDetails",
        description: "Retrieve a specific classification by ID",
        action: "Get classification details",
      },
    ],
    default: "search",
  },
];

const classificationFieldArrays = Object.values(operations).filter(
  (v): v is INodeProperties[] => Array.isArray(v),
);

export const classificationsDescription: INodeProperties[] = [
  ...classificationOperations,
  ...classificationFieldArrays.flat(),
];
