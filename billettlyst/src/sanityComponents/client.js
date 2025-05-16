import createClient from "@sanity/client";

export const client = createClient({
  projectId: "xcc2cnkq",
  dataset: "production",
  apiVersion: "v2025-05-16",
  useCdn: false,
});