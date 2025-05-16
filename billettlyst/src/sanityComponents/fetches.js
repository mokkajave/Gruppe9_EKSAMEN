import { client } from "./client";

  // Fetcher alle brukere fra sanity
  export async function fetchAllSanityUsers() {
    const data = await client.fetch(
      `*[_type == "user"]{_id, name, age, gender, wishlist[], previous_purchases[], image{asset ->{ _id, url }}}`
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