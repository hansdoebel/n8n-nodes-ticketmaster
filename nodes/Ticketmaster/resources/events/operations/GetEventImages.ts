import type { IExecuteFunctions, INodeProperties } from "n8n-workflow";
import { ticketmasterApiRequest } from "../../../GenericFunctions";

export const eventGetImagesFields: INodeProperties[] = [
  {
    displayName: "Event ID",
    name: "eventId",
    type: "string",
    required: true,
    default: "",
    description: 'Ticketmaster event ID for which to list images',
    displayOptions: {
      show: { resource: ["event"], operation: ["getImages"] },
    },
  },
];

export async function eventGetImagesExecute(
  this: IExecuteFunctions,
  index: number,
) {
  const eventId = this.getNodeParameter("eventId", index, "") as string;

  const response = await ticketmasterApiRequest.call(
    this,
    "GET",
    `/discovery/v2/events/${eventId}/images.json`,
  );

  const images = response?.images ?? [];
  return images.map((img: any) => ({ json: img }));
}
