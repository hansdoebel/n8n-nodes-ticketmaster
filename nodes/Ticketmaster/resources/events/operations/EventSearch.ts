import type { IExecuteFunctions, INodeProperties } from "n8n-workflow";
import { ticketmasterApiRequest } from "../../../GenericFunctions";

export const eventSearchFields: INodeProperties[] = [
  {
    displayName: "Keyword",
    name: "keyword",
    type: "string",
    default: "",
    description: 'Keyword to search for events (e.g. "rock" or "festival")',
    displayOptions: { show: { resource: ["event"], operation: ["search"] } },
  },
  {
    displayName: "Page Size",
    name: "size",
    type: "number",
    default: 20,
    typeOptions: { minValue: 1, maxValue: 200 },
    description: "Number of results per page (max 200)",
    displayOptions: { show: { resource: ["event"], operation: ["search"] } },
  },
  {
    displayName: "Page Number",
    name: "page",
    type: "number",
    default: 0,
    typeOptions: { minValue: 0 },
    description: "Page number of results to fetch",
    displayOptions: { show: { resource: ["event"], operation: ["search"] } },
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: { show: { resource: ["event"], operation: ["search"] } },
    options: [
      {
        displayName: "Attraction ID",
        name: "attractionId",
        type: "string",
        default: "",
      },
      {
        displayName: "City",
        name: "city",
        type: "string",
        default: "",
      },
      {
        displayName: "Classification ID",
        name: "classificationId",
        type: "string",
        default: "",
      },
      {
        displayName: "Classification Name",
        name: "classificationName",
        type: "string",
        default: "",
      },
      {
        displayName: "Country Code",
        name: "countryCode",
        type: "string",
        default: "",
      },
      {
        displayName: "DMA ID",
        name: "dmaId",
        type: "string",
        default: "",
      },
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "",
      },
      {
        displayName: "End Date Time",
        name: "endDateTime",
        type: "string",
        default: "",
      },
      {
        displayName: "Geo Point (GeoHash)",
        name: "geoPoint",
        type: "string",
        default: "",
      },
      {
        displayName: "ID",
        name: "id",
        type: "string",
        default: "",
      },
      {
        displayName: "Include Family",
        name: "includeFamily",
        type: "options",
        options: [
          { name: "Yes", value: "yes" },
          { name: "No", value: "no" },
          { name: "Only", value: "only" },
        ],
        default: "yes",
      },
      {
        displayName: "Include Spellcheck",
        name: "includeSpellcheck",
        type: "options",
        options: [
          { name: "Yes", value: "yes" },
          { name: "No", value: "no" },
        ],
        default: "no",
      },
      {
        displayName: "Include TBA",
        name: "includeTBA",
        type: "options",
        options: [
          { name: "Yes", value: "yes" },
          { name: "No", value: "no" },
          { name: "Only", value: "only" },
        ],
        default: "no",
      },
      {
        displayName: "Include TBD",
        name: "includeTBD",
        type: "options",
        options: [
          { name: "Yes", value: "yes" },
          { name: "No", value: "no" },
          { name: "Only", value: "only" },
        ],
        default: "no",
      },
      {
        displayName: "Include Test",
        name: "includeTest",
        type: "options",
        options: [
          { name: "Yes", value: "yes" },
          { name: "No", value: "no" },
          { name: "Only", value: "only" },
        ],
        default: "no",
      },
      {
        displayName: "Latitude/Longitude",
        name: "latlong",
        type: "string",
        default: "",
      },
      {
        displayName: "Locale",
        name: "locale",
        type: "string",
        default: "",
      },
      {
        displayName: "Market ID",
        name: "marketId",
        type: "string",
        default: "",
      },
      {
        displayName: "On Sale End Date Time",
        name: "onsaleEndDateTime",
        type: "string",
        default: "",
      },
      {
        displayName: "On Sale Start Date Time",
        name: "onsaleStartDateTime",
        type: "string",
        default: "",
      },
      {
        displayName: "Postal Code",
        name: "postalCode",
        type: "string",
        default: "",
      },
      {
        displayName: "Preferred Country",
        name: "preferredCountry",
        type: "options",
        options: [
          { name: "US", value: "us" },
          { name: "CA", value: "ca" },
        ],
        default: "us",
      },
      {
        displayName: "Promoter ID",
        name: "promoterId",
        type: "string",
        default: "",
      },
      {
        displayName: "Radius",
        name: "radius",
        type: "string",
        default: "",
      },
      {
        displayName: "Sort",
        name: "sort",
        type: "string",
        default: "relevance,desc",
      },
      {
        displayName: "Source",
        name: "source",
        type: "options",
        options: [
          { name: "Frontgate", value: "frontgate" },
          { name: "Ticketmaster", value: "ticketmaster" },
          { name: "Tmr", value: "tmr" },
          { name: "Universe", value: "universe" },
        ],
        default: "ticketmaster",
      },
      {
        displayName: "Start Date Time",
        name: "startDateTime",
        type: "string",
        default: "",
      },
      {
        displayName: "State Code",
        name: "stateCode",
        type: "string",
        default: "",
      },
      {
        displayName: "Unit",
        name: "unit",
        type: "options",
        options: [
          { name: "Miles", value: "miles" },
          { name: "Kilometers", value: "km" },
        ],
        default: "miles",
      },
      {
        displayName: "Venue ID",
        name: "venueId",
        type: "string",
        default: "",
      },
    ],
  },
];

export async function eventSearchExecute(
  this: IExecuteFunctions,
  index: number,
) {
  const keyword = this.getNodeParameter("keyword", index, "") as string;
  const size = this.getNodeParameter("size", index, 20) as number;
  const page = this.getNodeParameter("page", index, 0) as number;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    index,
    {},
  ) as Record<string, any>;

  const qs: Record<string, any> = { size, page };
  if (keyword) qs.keyword = keyword;

  Object.assign(qs, additionalFields);

  const response = await ticketmasterApiRequest.call(
    this,
    "GET",
    "/discovery/v2/events.json",
    qs,
  );

  const events = response?._embedded?.events ?? [];
  return events.map((e: any) => ({ json: e }));
}
