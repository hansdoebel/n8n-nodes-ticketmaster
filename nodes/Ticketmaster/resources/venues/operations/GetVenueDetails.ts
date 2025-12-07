import type { IExecuteFunctions, INodeProperties } from "n8n-workflow";
import { ticketmasterApiRequest } from "../../../GenericFunctions";

export const venueGetDetailsFields: INodeProperties[] = [
  {
    displayName: "Venue ID",
    name: "venueId",
    type: "string",
    required: true,
    default: "",
    description: 'Ticketmaster venue ID (e.g. KovZpZAFF6kA)',
    displayOptions: {
      show: { resource: ["venue"], operation: ["getDetails"] },
    },
  },
];

export async function venueGetDetailsExecute(
  this: IExecuteFunctions,
  index: number,
) {
  const venueId = this.getNodeParameter("venueId", index, "") as string;

  const response = await ticketmasterApiRequest.call(
    this,
    "GET",
    `/discovery/v2/venues/${venueId}.json`,
  );

  return [{ json: response }];
}
