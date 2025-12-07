import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeApiError } from "n8n-workflow";
import { eventsDescription } from "./resources/events/EventsDescription";
import * as eventOps from "./resources/events/operations";

export class Ticketmaster implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Ticketmaster",
    name: "ticketmaster",
    group: ["transform"],
    version: 1,
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
        options: [{ name: "Event", value: "event" }],
        default: "event",
      },
      ...eventsDescription,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter("resource", 0) as string;
    const operation = this.getNodeParameter("operation", 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let result;

        if (resource === "event") {
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
              throw new Error(`Unsupported operation: ${operation}`);
          }
        } else {
          throw new Error(`Unsupported resource: ${resource}`);
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
