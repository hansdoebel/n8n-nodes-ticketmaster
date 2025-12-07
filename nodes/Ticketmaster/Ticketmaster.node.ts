import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeApiError, NodeOperationError } from "n8n-workflow";

import { attractionsDescription } from "./resources/attractions/AttractionsDescription";
import { classificationsDescription } from "./resources/classifications/ClassificationsDescription";
import { eventsDescription } from "./resources/events/EventsDescription";
import { venuesDescription } from "./resources/venues/VenuesDescription";

import * as attractionOps from "./resources/attractions/operations";
import * as classificationOps from "./resources/classifications/operations";
import * as eventOps from "./resources/events/operations";
import * as venueOps from "./resources/venues/operations";

export class Ticketmaster implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Ticketmaster",
    name: "ticketmaster",
    group: ["transform"],
    version: 1,
    subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
    description: "Work with Ticketmaster Discovery API",
    icon: "file:ticketmaster.svg",
    defaults: { name: "Ticketmaster" },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [{ name: "ticketmasterApi", required: true }],
    properties: [
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          { name: "Attraction", value: "attraction" },
          { name: "Classification", value: "classification" },
          { name: "Event", value: "event" },
          { name: "Venue", value: "venue" },
        ],
        default: "event",
      },

      ...attractionsDescription,
      ...classificationsDescription,
      ...eventsDescription,
      ...venuesDescription,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter("resource", 0) as string;
    const operation = this.getNodeParameter("operation", 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let result: INodeExecutionData[] = [];

        if (resource === "attraction") {
          switch (operation) {
            case "search":
              result = await attractionOps.attractionSearchExecute.call(
                this,
                i,
              );
              break;
            case "getDetails":
              result = await attractionOps.attractionGetDetailsExecute.call(
                this,
                i,
              );
              break;
            default:
              throw new NodeOperationError(
                this.getNode(),
                `Unsupported operation: ${resource}.${operation}`,
              );
          }
        } else if (resource === "classification") {
          switch (operation) {
            case "search":
              result = await classificationOps.classificationSearchExecute.call(
                this,
                i,
              );
              break;
            case "getDetails":
              result = await classificationOps.classificationGetDetailsExecute
                .call(
                  this,
                  i,
                );
              break;
            default:
              throw new NodeOperationError(
                this.getNode(),
                `Unsupported operation: ${resource}.${operation}`,
              );
          }
        } else if (resource === "event") {
          switch (operation) {
            case "search":
              result = await eventOps.eventSearchExecute.call(this, i);
              break;
            case "getDetails":
              result = await eventOps.eventGetDetailsExecute.call(this, i);
              break;
            case "getImages":
              result = await eventOps.eventGetImagesExecute.call(this, i);
              break;
            default:
              throw new NodeOperationError(
                this.getNode(),
                `Unsupported operation: ${resource}.${operation}`,
              );
          }
        } else if (resource === "venue") {
          switch (operation) {
            case "search":
              result = await venueOps.venueSearchExecute.call(this, i);
              break;
            case "getDetails":
              result = await venueOps.venueGetDetailsExecute.call(this, i);
              break;
            default:
              throw new NodeOperationError(
                this.getNode(),
                `Unsupported operation: ${resource}.${operation}`,
              );
          }
        } else {
          throw new NodeOperationError(
            this.getNode(),
            `Unsupported resource: ${resource}`,
          );
        }

        returnData.push(...result);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: (error as Error).message } });
          continue;
        }
        throw new NodeApiError(this.getNode(), error);
      }
    }

    return [returnData];
  }
}
