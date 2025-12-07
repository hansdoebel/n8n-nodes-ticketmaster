import type { IExecuteFunctions, INodeProperties } from "n8n-workflow";
import { ticketmasterApiRequest } from "../../../GenericFunctions";

/**
 * -------------------------------------
 *  UI: Get Classification Details
 * -------------------------------------
 */
export const classificationGetDetailsFields: INodeProperties[] = [
  {
    displayName: "Classification ID",
    name: "classificationId",
    type: "string",
    required: true,
    default: "",
    description: 'Ticketmaster classification ID to retrieve details for',
    displayOptions: {
      show: { resource: ["classification"], operation: ["getDetails"] },
    },
  },
];

/**
 * -------------------------------------
 *  EXECUTION LOGIC
 * -------------------------------------
 */
export async function classificationGetDetailsExecute(
  this: IExecuteFunctions,
  index: number,
) {
  const classificationId = this.getNodeParameter(
    "classificationId",
    index,
    "",
  ) as string;

  const response = await ticketmasterApiRequest.call(
    this,
    "GET",
    `/discovery/v2/classifications/${classificationId}.json`,
  );

  return [{ json: response }];
}
