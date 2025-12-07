import type { IExecuteFunctions, INodeProperties } from "n8n-workflow";
import { ticketmasterApiRequest } from "../../../GenericFunctions";

export const attractionGetDetailsFields: INodeProperties[] = [
  {
    displayName: "Attraction ID",
    name: "attractionId",
    type: "string",
    required: true,
    default: "",
    description: 'Ticketmaster attraction ID (e.g. K8vZ9171fQ0)',
    displayOptions: {
      show: { resource: ["attraction"], operation: ["getDetails"] },
    },
  },
];

export async function attractionGetDetailsExecute(
  this: IExecuteFunctions,
  index: number,
) {
  const attractionId = this.getNodeParameter(
    "attractionId",
    index,
    "",
  ) as string;

  const response = await ticketmasterApiRequest.call(
    this,
    "GET",
    `/discovery/v2/attractions/${attractionId}.json`,
  );

  return [{ json: response }];
}
