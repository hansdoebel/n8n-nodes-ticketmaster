import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeApiError } from "n8n-workflow";

export class Ticketmaster implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Ticketmaster",
    name: "ticketmaster",
    group: ["transform"],
    version: 1,
    description: "Consume the Ticketmaster API",
    icon: "file:ticketmaster.svg",
    defaults: {
      name: "Ticketmaster",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "ticketmasterApi",
        required: true,
      },
    ],
    properties: [
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
								noDataExpression: true,
        options: [
          {
            name: "Event",
            value: "event",
          },
          {
            name: "Venue",
            value: "venue",
          },
        ],
        default: "event",
        required: true,
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
								noDataExpression: true,
        options: [
          {
            name: 'Get Many',
            value: "getAll",
            description: 'Retrieve many events',
												action: 'Retrieve all events',
          },
        ],
        default: "getAll",
        required: true,
      },
      {
        displayName: "Keyword",
        name: "keyword",
        type: "string",
        default: "",
        description:
          'Optional keyword search term for filtering events (e.g. "rock", "football")',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter("resource", 0) as string;
    const operation = this.getNodeParameter("operation", 0) as string;
    const keyword = this.getNodeParameter("keyword", 0, "") as string;

    const credentials = await this.getCredentials("ticketmasterApi");
    const apiKey = credentials.apiKey as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData;

        if (resource === "event" && operation === "getAll") {
          const qs: Record<string, string> = { apikey: apiKey };

          if (keyword) qs.keyword = keyword;

          const url = "https://app.ticketmaster.com/discovery/v2/events.json";

          responseData = await this.helpers.request({
            method: "GET",
            uri: url,
            qs,
            json: true,
          });
        } else {
          throw new NodeApiError(this.getNode(), {
            message: "Unknown operation/resource combination",
          });
        }

        returnData.push({
          json: responseData,
        });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
          continue;
        }
        throw new NodeApiError(this.getNode(), error);
      }
    }

    return [returnData];
  }
}
