import type { IExecuteFunctions, INodeProperties } from "n8n-workflow";
import { ticketmasterApiRequest } from "../../../GenericFunctions";

export const attractionSearchFields: INodeProperties[] = [
  {
    displayName: "Keyword",
    name: "keyword",
    type: "string",
    default: "",
    description:
      "Keyword to search for attractions (e.g. “artist”, “team”, “play”)",
    displayOptions: {
      show: { resource: ["attraction"], operation: ["search"] },
    },
  },
  {
    displayName: "Page Size",
    name: "size",
    type: "number",
    default: 20,
    typeOptions: { minValue: 1, maxValue: 200 },
    description: "Number of results to return (max 200)",
    displayOptions: {
      show: { resource: ["attraction"], operation: ["search"] },
    },
  },
  {
    displayName: "Page Number",
    name: "page",
    type: "number",
    default: 0,
    typeOptions: { minValue: 0 },
    description: "Page number of results to return",
    displayOptions: {
      show: { resource: ["attraction"], operation: ["search"] },
    },
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: { resource: ["attraction"], operation: ["search"] },
    },
    options: [
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
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "",
      },
      {
        displayName: "Genre ID",
        name: "genreId",
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
        displayName: "Locale",
        name: "locale",
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
        displayName: "Segment ID",
        name: "segmentId",
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
        displayName: "SubGenre ID",
        name: "subGenreId",
        type: "string",
        default: "",
      },
      {
        displayName: "SubType ID",
        name: "subTypeId",
        type: "string",
        default: "",
      },
      {
        displayName: "Type ID",
        name: "typeId",
        type: "string",
        default: "",
      },
    ],
  },
];

export async function attractionSearchExecute(
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
    "/discovery/v2/attractions.json",
    qs,
  );

  const attractions = response?._embedded?.attractions ?? [];
  return attractions.map((a: any) => ({ json: a }));
}
