import {
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  IHttpRequestOptions,
  ILoadOptionsFunctions,
} from "n8n-workflow";

export async function ticketmasterApiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  qs: Record<string, any> = {},
  body: Record<string, any> = {},
): Promise<any> {
  const credentials = await this.getCredentials("ticketmasterApi");
  const apiKey = credentials.apiKey as string;

  qs.apikey = apiKey;

  const options: IHttpRequestOptions = {
    method,
    url: `https://app.ticketmaster.com${endpoint}`, // `url` is preferred over `uri` in n8n typings
    qs,
    body: Object.keys(body).length ? body : undefined,
    json: true,
  };

  try {
    const response = await this.helpers.request!(options);
    return response;
  } catch (error: any) {
    const status = error.statusCode || "UNKNOWN";
    const message = error.message || "Unknown Ticketmaster API error";
    throw new Error(`Ticketmaster API Error [${status}]: ${message}`);
  }
}

export async function ticketmasterApiRequestAllItems(
  this: IExecuteFunctions,
  endpoint: string,
  qs: Record<string, any> = {},
): Promise<any[]> {
  const allItems: any[] = [];
  let responseData;
  let currentPage = 0;

  do {
    qs.page = currentPage;
    responseData = await ticketmasterApiRequest.call(this, "GET", endpoint, qs);
    const items = responseData._embedded?.events ?? [];
    allItems.push(...items);
    currentPage++;
  } while (
    responseData.page?.totalPages && currentPage < responseData.page.totalPages
  );

  return allItems;
}
