import { client } from "./client";

  // Fetcher alle brukere fra sanity
  export async function fetchAllSanityUsers() {
    const data = await client.fetch(
      `*[_type == "user"]{_id, name, age, gender, image{asset ->{ _id, url }}, wishlist[]->{_id, title, apiid, category}, previous_purchases[]->{_id, title, apiid, category}}`
    );
    return data;
  }

  //Fether alle events fra sanity
  export async function fetchAllSanityEvents() {
    const data = await client.fetch(
      `*[_type == "event"]{_id, title, apiid}`
    );
    return data;
  }