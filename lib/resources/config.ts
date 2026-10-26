import config from "@/content/resources/sources.json";
import summary from "./summary.json";

export const resourceSources = config.sources;
export const resourceCollections = config.collections;
export const resourceSummary = summary;
export const resourceGroups = [...new Set(resourceCollections.map((collection) => collection.group))];
export function getResourceSource(id: string) { return resourceSources.find((source) => source.id === id); }
export function getResourceCollection(id: string) { return resourceCollections.find((collection) => collection.id === id); }
export function collectionResourceCount(id: string) { return resourceSummary.collections[id as keyof typeof resourceSummary.collections] ?? 0; }
