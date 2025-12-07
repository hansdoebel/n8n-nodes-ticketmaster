import { ICredentialType, INodeProperties } from "n8n-workflow";

export class TicketmasterApi implements ICredentialType {
  name = "ticketmasterApi";
  displayName = "Ticketmaster API";
  documentationUrl = "https://developer.ticketmaster.com/";
  properties: INodeProperties[] = [
    {
      displayName: "API Key",
      name: "apiKey",
      type: "string",
						typeOptions: { password: true },
      default: "",
      required: true,
      description: "Your Ticketmaster API key",
    },
  ];
}
