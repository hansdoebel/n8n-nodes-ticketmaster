import type { IExecuteFunctions, INodeProperties } from "n8n-workflow";
import { ticketmasterApiRequest } from "../../../GenericFunctions";

export const eventGetDetailsFields: INodeProperties[] = [
  {
    displayName: "Event ID",
    name: "eventId",
    type: "string",
    default: "",
    required: true,
    description: 'Unique Ticketmaster Event ID (e.g. “Z7r9jZ1Ae9vZ3”)',
    displayOptions: {
      show: { resource: ["event"], operation: ["getDetails"] },
    },
  },
];

export async function eventGetDetailsExecute(
  this: IExecuteFunctions,
  index: number,
) {
  const eventId = this.getNodeParameter("eventId", index, "") as string;

  const response = await ticketmasterApiRequest.call(
    this,
    "GET",
    `/discovery/v2/events/${eventId}.json`,
  );

  return [{ json: response }];
}
