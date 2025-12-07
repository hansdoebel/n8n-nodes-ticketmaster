import type { IExecuteFunctions, INodeProperties } from "n8n-workflow";
import { ticketmasterApiRequest } from "../../../GenericFunctions";

export const venueSearchFields: INodeProperties[] = [
  {
    displayName: "Keyword",
    name: "keyword",
    type: "string",
    default: "",
    description: "Keyword to search for venues",
    displayOptions: { show: { resource: ["venue"], operation: ["search"] } },
  },
  {
    displayName: "Page Size",
    name: "size",
    type: "number",
    default: 20,
    typeOptions: { minValue: 1, maxValue: 200 },
    description: "Number of results to return (max 200)",
    displayOptions: { show: { resource: ["venue"], operation: ["search"] } },
  },
  {
    displayName: "Page Number",
    name: "page",
    type: "number",
    default: 0,
    typeOptions: { minValue: 0 },
    description: "Page number of results to return",
    displayOptions: { show: { resource: ["venue"], operation: ["search"] } },
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: { show: { resource: ["venue"], operation: ["search"] } },
    options: [
      {
        displayName: "Country Code",
        name: "countryCode",
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
        displayName: "Geo Point",
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
        displayName: "Latitude/Longitude (Latlong)",
        name: "latlong",
        type: "string",
        default: "",
      },
      {
        displayName: "Locale",
        name: "locale",
        type: "string",
        default: "en",
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
    ],
  },
];

export async function venueSearchExecute(
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
    "/discovery/v2/venues.json",
    qs,
  );

  const venues = response?._embedded?.venues ?? [];
  return venues.map((v: any) => ({ json: v }));
}
